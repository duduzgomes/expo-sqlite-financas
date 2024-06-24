import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useRecordDatabase } from '@/database/useRecordDatabase'

import FormButton from '@/components/form-button'
import { InputForm } from '@/components/form-input'
import ButtonRadio from '@/components/button-radio'
import { Select } from '@/components/select'
import ButtonIcon from '@/components/button-icon'
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { formatDefaultDateIso } from '@/utils/date'
import { useRoute } from '@react-navigation/native'

type DateProps = {
    month: string
    year: string
}

export default function AddRecord() {
    const [typeRecord, setTypeRecord] = useState('income')
    const [typeModality, setTypeModality] = useState('single')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [category, setCategory] = useState('')
    const [qtdInstallments, setQtdInstallments] = useState('')
    const [dueDate, setDueDate] = useState('')

    const [showCalendar, setShowCalendar] = useState(false)
    const [dateCalendar, setDateCalendar] = useState<Date>(new Date())

    const recordDatabase = useRecordDatabase()
    const route = useRoute()
    const date = route.params as DateProps

    const numberYear = Number(date.year)
    const numberMonth = Number(date.month) - 1
    const dateFormated = new Date(numberYear, numberMonth)

    const expense = typeRecord === 'expense'
    const installment = typeModality === 'installment'
    const isRecurrence = typeModality == 'recurrent'

    const options = [
        { label: 'Receita', value: 'income' },
        { label: 'Despesa', value: 'expense' },
    ]
    const optionsSelect = [
        { label: 'Alimentação', value: 'Alimentação' },
        { label: 'Transporte', value: 'Transporte' },
        { label: 'Moradia', value: 'Moradia' },
        { label: 'Educação', value: 'Educação' },
        { label: 'Saúde', value: 'Saúde' },
        { label: 'Lazer', value: 'Lazer' },
        { label: 'Compras', value: 'Compras' },
        { label: 'Contas', value: 'Contas' },
        { label: 'Impostos', value: 'Impostos' },
        { label: 'Investimentos', value: 'Investimentos' },
        { label: 'Outros', value: 'Outros' },
    ]
    const optionsModality = [
        { label: 'Unico', value: 'single' },
        { label: 'Parcelado', value: 'installment' },
        { label: 'Recorrente', value: 'recurrent' },
    ]

    function handleCalendar(event: DateTimePickerEvent, selectDate?: Date) {
        if (event.type == 'dismissed') return
        setDueDate(selectDate ? formatDefaultDateIso(selectDate) : dueDate)
        setDateCalendar(selectDate ?? dateCalendar)
        setShowCalendar(false)
    }

    function isValidated() {
        const processedValue = value.replace(',', '.')
        if (description == '') {
            Alert.alert('Descrição', 'O campo descrição não pode ser vazio!')
            return false
        }
        if (processedValue == '') {
            Alert.alert('Valor', 'Informe o valor')
            return false
        }
        if (isNaN(Number(processedValue))) {
            Alert.alert('Valor', 'O campo valor deve ser um número!')
            return false
        }
        if (typeRecord == 'expense') {
            if (category == '') {
                Alert.alert('Categoria', 'Informe uma categoria!')
                return false
            }
            if (dueDate == '') {
                Alert.alert('Vencimento', 'Informe um Vencimento!')
                return false
            }
        }
        if (typeModality == 'installment') {
            if (isNaN(Number(qtdInstallments))) {
                Alert.alert(
                    'Quantidade de parcelas',
                    'O número de parcelas deve ser um número!',
                )
                return false
            }
            if (Number(qtdInstallments) <= 0) {
                Alert.alert(
                    'Quantidade de parcelas',
                    'Informe o a quantidade de parcelas!',
                )
                return false
            }
        }

        return true
    }

    async function createSingleIncomeRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId = await recordDatabase.createSingleIncomeRecord({
                    record_type: typeRecord,
                    type_modality: typeModality,
                    description,
                    value: Number(processedValue),
                    record_date: dateFormated,
                })
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createInstallmentIncomeRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId =
                    await recordDatabase.createInstallmentIncomeRecord({
                        record_type: typeRecord,
                        type_modality: typeModality,
                        description,
                        value: Number(processedValue),
                        qtd_installments: Number(qtdInstallments),
                        due_date: dateCalendar,
                        record_date: dateFormated,
                    })
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createRecurrenceIncomeRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId =
                    await recordDatabase.createRecurrenceIncomeRecord({
                        record_type: typeRecord,
                        type_modality: typeModality,
                        description,
                        value: Number(processedValue),
                        record_date: dateFormated,
                    })
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createSingleExpenseRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId = await recordDatabase.createSingleExpenseRecord(
                    {
                        record_type: typeRecord,
                        type_modality: typeModality,
                        description,
                        value: Number(processedValue),
                        category,
                        record_date: dateFormated,
                        due_date: dateCalendar,
                    },
                )
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createInstallmentExpenseRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId =
                    await recordDatabase.createInstallmentExpenseRecord({
                        record_type: typeRecord,
                        type_modality: typeModality,
                        category,
                        description,
                        value: Number(processedValue),
                        qtd_installments: Number(qtdInstallments),
                        due_date: dateCalendar,
                        record_date: dateFormated,
                    })
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createRecurrenceExpenseRecord() {
        try {
            if (isValidated()) {
                const processedValue = value.replace(',', '.')
                const recordId =
                    await recordDatabase.createRecurrenceExpenseRecord({
                        record_type: typeRecord,
                        type_modality: typeModality,
                        category,
                        description,
                        value: Number(processedValue),
                        due_date: dateCalendar,
                        record_date: dateFormated,
                    })
                router.back()
                return recordId
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleCreateRecord() {
        if (typeRecord == 'income' && typeModality == 'single') {
            createSingleIncomeRecord()
            return
        }
        if (typeRecord == 'income' && typeModality == 'installment') {
            createInstallmentIncomeRecord()
            return
        }
        if (typeRecord == 'income' && typeModality == 'recurrent') {
            createRecurrenceIncomeRecord()
            return
        }
        if (typeRecord == 'expense' && typeModality == 'single') {
            createSingleExpenseRecord()
            return
        }
        if (typeRecord == 'expense' && typeModality == 'installment') {
            createInstallmentExpenseRecord()
            return
        }
        if (typeRecord == 'expense' && typeModality == 'recurrent') {
            createRecurrenceExpenseRecord()
            return
        }
    }

    return (
        <View className='flex-1 bg-gray-900 pt-10 px-4'>
            {showCalendar && (
                <DateTimePicker
                    testID='dateTimePicker'
                    display='default'
                    value={dateCalendar}
                    mode='date'
                    onChange={handleCalendar}
                />
            )}

            <ButtonRadio
                options={options}
                checkedValue={typeRecord}
                onChange={setTypeRecord}
            />
            <View className='my-2 z-60 mt-4'>
                <Text className='text-base text-white w-1/3 py-2  font-subtitle'>
                    Modalidade
                </Text>
                <Select.Field
                    placeHolder='Selecione uma Modalidade'
                    options={optionsModality}
                    checkedValue={typeModality}
                    onChange={setTypeModality}
                    disable={false}
                />
            </View>
            <InputForm label='Descrição'>
                <InputForm.Field
                    placeholder={description}
                    onChangeText={setDescription}
                    value={description}
                />
            </InputForm>

            <InputForm label={installment ? 'Valor parcela' : 'Valor'}>
                <InputForm.Field
                    placeholder={value}
                    keyboardType='numeric'
                    onChangeText={setValue}
                    value={value}
                />
            </InputForm>

            {installment && !isRecurrence && (
                <>
                    <InputForm label='Num. parcelas'>
                        <InputForm.Field
                            value={qtdInstallments}
                            onChangeText={setQtdInstallments}
                            keyboardType='numeric'
                        />
                    </InputForm>
                </>
            )}

            {expense && (
                <>
                    <InputForm label='Vencimento'>
                        <InputForm.Field
                            value={dueDate}
                            keyboardType='default'
                            editable={false}
                        />
                        <ButtonIcon
                            nameIcon='calendar-month'
                            style={{ paddingLeft: 10 }}
                            onPress={() => setShowCalendar(true)}
                        />
                    </InputForm>
                    <View className='my-4 z-60'>
                        <Text className='text-base text-white w-1/3 py-2  font-subtitle'>
                            Categoria
                        </Text>
                        <Select.Field
                            placeHolder='Selecione uma categoria'
                            options={optionsSelect}
                            checkedValue={category}
                            onChange={setCategory}
                            disable={!expense}
                        />
                    </View>
                </>
            )}

            <FormButton label='Salvar' onPress={handleCreateRecord} />
        </View>
    )
}
