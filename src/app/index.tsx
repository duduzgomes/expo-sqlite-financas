import { useCallback, useEffect, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons'

import { RecordProps, useRecordDatabase } from '@/database/useRecordDatabase'
import { colors } from '@/styles/colors'
import {
    returnMonthAndYear,
    dateFormattedInFull,
    prevMonth,
    nextMonth,
    compareDate,
    sumMonthReturnIntance,
} from '@/utils/date'

import { ModalArea } from '@/components/modal-calendar'
import { InfoBalance } from '@/components/info-balance'
import { Input } from '@/components/input'
import Calendar from '@/components/calendar'
import ButtonIcon from '@/components/button-icon'
import Record from '@/components/record'
import ButtonAdd from '@/components/button-add'
import { Link, useFocusEffect } from 'expo-router'

export default function Index() {
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [date, setDate] = useState(new Date())
    const [formattedDate, setFormattedDate] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)
    const [list, setList] = useState<RecordProps[]>([])
    const [search, setSearch] = useState('')

    const [income, setIncome] = useState<number>(0)
    const [expense, setExpense] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)

    useState(false)

    const database = useRecordDatabase()

    const handleChooseCalendar = (date: Date) => {
        setDate(new Date(date))
        setShowCalendar(false)
        updateDate()
    }

    function prevDate() {
        const newDate = prevMonth(date)
        setDate(newDate)
    }

    function nextDate() {
        const newDate = nextMonth(date)
        setDate(newDate)
    }

    function updateDate() {
        setFormattedDate(dateFormattedInFull(date))
        let { m, y } = returnMonthAndYear(date)
        setMonth(m)
        setYear(y)
    }

    function testBalance() {
        setIncome(0)
        setExpense(0)
        list?.map(record => {
            if (record.record_type == 'income') {
                setIncome(prev => prev + record.value)
            } else {
                setExpense(prev => prev + record.value)
            }
        })
    }

    async function listActiveRecurringRecords() {
        try {
            const response = await database.listActiveRecurringRecords()
            console.log(response)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async function createNewRecord(record: RecordProps) {
        if (record.record_type == 'income') {
            try {
                const result = await database.createRecurrenceIncomeRecord({
                    record_type: record.record_type,
                    type_modality: record.type_modality,
                    description: record.description,
                    value: record.value,
                    record_date: sumMonthReturnIntance(record.record_date, 1),
                })
                return result
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const result = await database.createRecurrenceExpenseRecord({
                    record_type: record.record_type,
                    description: record.description,
                    type_modality: record.type_modality,
                    value: record.value,
                    category: record.category,
                    due_date: sumMonthReturnIntance(record.due_date, 1),
                    record_date: sumMonthReturnIntance(record.record_date, 1),
                })
                return result
            } catch (error) {
                console.log(error)
            }
        }
    }

    async function disableRecurrence(recordId: number) {
        try {
            await database.disableRecurrence(recordId)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            const listRecords = async () => {
                if (search == '') {
                    try {
                        const response = await database.listRecordByDate(
                            month,
                            year,
                        )
                        setList(response)
                    } catch (error) {
                        console.error(error)
                    }
                } else {
                    try {
                        const response =
                            await database.searchRecordByDescription(
                                month,
                                year,
                                search,
                            )
                        setList(response)
                    } catch (error) {
                        console.error(error)
                    }
                }
            }

            listRecords()

            return () => {}
        }, [month, year, search]),
    )

    useEffect(() => {
        updateDate()
    }, [date])

    useEffect(() => {
        testBalance()
    }, [list])

    useEffect(() => {
        setBalance(income - expense)
    }, [income, expense])

    useEffect(() => {
        listActiveRecurringRecords().then(async result => {
            result?.map(async record => {
                console.log('data avaliada: ' + record.record_date)
                const isValidated = compareDate(record.record_date, new Date())
                console.log(isValidated)
                if (isValidated && record.recurrence_status == 'active') {
                    createNewRecord(record)
                    disableRecurrence(record.record_id)
                }
            })
        })
    }, [])

    return (
        <View className='flex-1 bg-gray-900 pt-14 px-4 pb-2'>
            <StatusBar style='light' />
            <ModalArea
                animationType='slide'
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => setShowCalendar(false)}
            >
                <ModalArea.Field
                    date={date}
                    handleChooseCalendar={handleChooseCalendar}
                    showCalendar={showCalendar}
                />
            </ModalArea>

            <InfoBalance>
                <InfoBalance.Field
                    title='Receita'
                    value={
                        income
                            ? String(income?.toFixed(2)).replace('.', ',')
                            : '0'
                    }
                />
                <InfoBalance.Field
                    title='Despesa'
                    value={
                        expense
                            ? String(expense?.toFixed(2)).replace('.', ',')
                            : '0'
                    }
                />
                <InfoBalance.Field
                    title='Saldo'
                    value={
                        balance
                            ? String(balance?.toFixed(2)).replace('.', ',')
                            : '0'
                    }
                />
            </InfoBalance>

            <Calendar
                date={formattedDate}
                nextDate={nextDate}
                prevDate={prevDate}
            />

            <Input>
                <MaterialIcons
                    name='search'
                    size={24}
                    color={colors.gray[400]}
                />
                <Input.Field
                    placeholder='Pesquisar'
                    value={search}
                    onChangeText={setSearch}
                />
                <ButtonIcon
                    nameIcon='calendar-month'
                    onPress={() => setShowCalendar(true)}
                />
            </Input>

            <FlatList
                data={list}
                keyExtractor={item => String(item.record_id)}
                renderItem={({ item }) => <Record data={item} />}
                contentContainerStyle={{
                    gap: 16,
                    paddingVertical: 14,
                }}
                ListHeaderComponent={() => (
                    <Text className='uppercase text-gray-400 text-base font-subtitle '>
                        Registros
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <View className='flex-1 justify-center items-center py-6 h-96'>
                        <MaterialIcons
                            name='newspaper'
                            size={80}
                            color={colors.gray[400]}
                        />
                        <Text className='font-subtitle text-gray-400 text-lg '>
                            Não há registros
                        </Text>
                    </View>
                )}
            />

            <ButtonAdd month={month} year={year} />
        </View>
    )
}
