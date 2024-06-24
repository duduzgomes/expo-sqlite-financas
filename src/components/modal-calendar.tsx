import { ReactNode } from 'react'
import { Modal, ModalProps, View } from 'react-native'
// @ts-ignore
import MonthPicker from 'react-native-month-picker'
import { colors } from '@/styles/colors'

type PickerProps = {
    date: Date
    handleChooseCalendar: (date: Date) => void
    showCalendar: boolean
}

type ModalAreaProps = ModalProps & {
    children: ReactNode
}

function ModalArea({ children, ...rest }: ModalAreaProps) {
    return <Modal {...rest}>{children}</Modal>
}

function ModelField({ date, handleChooseCalendar, showCalendar }: PickerProps) {
    return (
        <View className='flex-1 items-center justify-center p-4'>
            {showCalendar && (
                <MonthPicker
                    selectedDate={date}
                    onMonthChange={handleChooseCalendar}
                    localeLanguage='pt'
                    maxDate={new Date(2100, 1)}
                    minDate={new Date(2000, 1)}
                    nextText='Próximo'
                    prevText='Anterior'
                    selectedBackgroundColor={colors.orange[500]}
                    currentMonthTextStyle={{ color: colors.orange[800] }}
                />
            )}
        </View>
    )
}

ModalArea.Field = ModelField

export { ModalArea }
