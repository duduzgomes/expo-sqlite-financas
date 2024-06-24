import ButtonIcon from '@/components/button-icon'
import FormButton from '@/components/form-button'
import { InputForm } from '@/components/form-input'
import ModalBox from '@/components/modal-box'
import { Select } from '@/components/select'
import { RecordProps, useRecordDatabase } from '@/database/useRecordDatabase'
import { colors } from '@/styles/colors'
import {
    DateReturnIntance,
    formatDefaultDate,
    formatDefaultDateIso,
    sumMonth,
} from '@/utils/date'
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useRoute } from '@react-navigation/native'
import clsx from 'clsx'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

export default function Details() {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [category, setCategory] = useState('')
    const [showBoxExclude, setBoxExlude] = useState(false)
    const [showBoxDisable, setBoxDisable] = useState(false)
    const [edit, setEdit] = useState(false)
    const [dueDate, setDueDate] = useState('')

    const [showCalendar, setShowCalendar] = useState(false)
    const [dateCalendar, setDateCalendar] = useState<Date>(new Date())

    const recordDatabase = useRecordDatabase()

    const route = useRoute()

    const data = route.params as RecordProps

    useEffect(() => {
        setDescription(data.description)
        setValue(String(data.value))
        setCategory(data.category)
        setDueDate(data.due_date ? formatDefaultDate(data.due_date) : '')
        setDateCalendar(
            data.due_date ? DateReturnIntance(data.due_date) : new Date(),
        )
    }, [])

    const optionsModality = [
        { label: 'Unico', value: 'single' },
        { label: 'Parcelado', value: 'installment' },
        { label: 'Recorrente', value: 'recurrent' },
    ]

    function getLabelFromValue(value: string) {
        const option = optionsModality.find(option => option.value == value)
        return option ? option.label : ''
    }

    const expense = data.record_type == 'expense'
    const installment = data.type_modality == 'installment'
    const recurrent = data.type_modality == 'recurrent'
    const activeRecurrency = data.recurrence_status == 'active'
    const placeHolderModality = getLabelFromValue(data.type_modality)

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

    async function disableRecurrence() {
        try {
            await recordDatabase.disableRecurrence(data.record_id)
        } catch (error) {
            console.log(error)
        }
    }

    function handleCalendar(event: DateTimePickerEvent, selectDate?: Date) {
        if (event.type == 'dismissed') return
        setDueDate(selectDate ? formatDefaultDateIso(selectDate) : dueDate)
        setDateCalendar(selectDate ?? new Date(data.due_date))
        setShowCalendar(false)
    }

    async function deleteById() {
        try {
            await recordDatabase.deleteRecordById(Number(data.record_id))
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteByGroupId() {
        try {
            await recordDatabase.deleteRecordByGroupId(data.group_id)
        } catch (error) {
            console.log(error)
        }
    }

    async function updateIncomeRecord() {
        try {
            const processedValue = value.replace(',', '.')
            await recordDatabase.updateIncomeRecord(data.record_id, {
                description,
                value: Number(processedValue),
                due_date: dateCalendar,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function updateExpenseRecord() {
        try {
            const processedValue = value.replace(',', '.')
            await recordDatabase.updateExpenseRecord(data.record_id, {
                description,
                category,
                value: Number(processedValue),
                due_date: dateCalendar,
            })
        } catch (error) {
            console.log(error)
        }
    }

    function handleDelete() {
        if (data.type_modality == 'installment') {
            deleteByGroupId()
        } else {
            deleteById()
        }
        setBoxExlude(false)
        router.back()
    }

    function handleDisableRecurrence() {
        disableRecurrence()
        setBoxDisable(false)
        router.back()
    }

    async function handleUpdate() {
        if (description === '') {
            Alert.alert('Descrição', 'Informe uma descrição!')
            return
        }
        if (data.record_type == 'income') {
            await updateIncomeRecord()
        } else {
            await updateExpenseRecord()
        }
        setEdit(false)
    }

    return (
        <View className='flex-1 bg-gray-900 pt-10 px-4'>
            <ModalBox
                visible={showBoxExclude}
                message='Todas as parcelas dessa transação serão excluídas, caso existam. Deseja continuar?'
                title='Atenção'
                onCancel={() => setBoxExlude(false)}
                onConfirm={handleDelete}
                type='confirm'
            />
            <ModalBox
                visible={showBoxDisable}
                message='Para ativá-la novamente será necessário criar outro registro. Deseja continuar?'
                title='Atenção'
                onCancel={() => setBoxDisable(false)}
                onConfirm={handleDisableRecurrence}
                type='confirm'
            />
            {showCalendar && (
                <DateTimePicker
                    testID='dateTimePicker'
                    display='default'
                    value={dateCalendar}
                    mode='date'
                    onChange={handleCalendar}
                />
            )}
            <View className='justify-end space-x-6 flex-row'>
                <TouchableOpacity
                    onPress={() => setEdit(true)}
                    className='flex-row'
                >
                    <ButtonIcon nameIcon='edit' color={colors.orange[500]} />
                    <Text className='text-base font-subtitle text-white pl-1'>
                        Editar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setBoxExlude(true)}
                    className='flex-row'
                >
                    <ButtonIcon nameIcon='delete' color={colors.orange[500]} />
                    <Text className='text-base font-subtitle text-white pl-1'>
                        Excluir
                    </Text>
                </TouchableOpacity>
            </View>

            <InputForm label='Descrição'>
                <InputForm.Field
                    value={description}
                    onChangeText={setDescription}
                    editable={edit}
                />
            </InputForm>
            <InputForm label='Valor'>
                <InputForm.Field
                    value={
                        edit
                            ? value
                            : Number(value).toFixed(2).replace('.', ',')
                    }
                    onChangeText={setValue}
                    editable={edit}
                />
            </InputForm>
            <InputForm label='Modalidade'>
                <InputForm.Field value={placeHolderModality} editable={false} />
            </InputForm>
            <InputForm label='Criado em'>
                <InputForm.Field
                    value={formatDefaultDate(data.created_at)}
                    editable={false}
                />
            </InputForm>

            {expense && (
                <>
                    <View className='my-4 z-60'>
                        <Text className='text-base text-white w-1/3 py-2  font-subtitle'>
                            Categoria
                        </Text>
                        <Select.Field
                            options={optionsSelect}
                            placeHolder={data.category}
                            checkedValue={category}
                            onChange={setCategory}
                            disable={!edit}
                        />
                    </View>
                </>
            )}

            {installment && (
                <>
                    <InputForm label='Num. parcelas'>
                        <InputForm.Field
                            editable={false}
                            value={
                                data.num_installment +
                                '/' +
                                data.qtd_installments
                            }
                        />
                    </InputForm>
                </>
            )}

            {(expense || installment) && (
                <InputForm label='Vencimento'>
                    <InputForm.Field
                        value={dueDate}
                        isDate={true}
                        toogle={edit}
                        keyboardType='default'
                        editable={false}
                        placeholder={formatDefaultDate(data.due_date)}
                    />
                    <ButtonIcon
                        nameIcon='calendar-month'
                        style={{ paddingLeft: 10 }}
                        disabled={!edit}
                        onPress={() => setShowCalendar(true)}
                    />
                </InputForm>
            )}

            {recurrent && (
                <>
                    <View className=' mt-6'>
                        <TouchableOpacity
                            className={clsx(
                                ' bg-gray-700 self-start px-4 py-2 rounded-lg',
                                {
                                    'bg-orange-500': activeRecurrency,
                                },
                            )}
                            disabled={!activeRecurrency}
                            onPress={() => setBoxDisable(true)}
                        >
                            <Text
                                className={clsx(
                                    'text-sm text-gray-500 font-bold',
                                    {
                                        'text-black': activeRecurrency,
                                    },
                                )}
                            >
                                Desativar Recorrência
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            {edit && (
                <FormButton label='Aplicar alterações' onPress={handleUpdate} />
            )}
        </View>
    )
}
