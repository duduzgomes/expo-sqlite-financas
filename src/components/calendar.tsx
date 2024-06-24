import { View, Text } from 'react-native'
import ButtonIcon from './button-icon'

type CalendarProps = {
    date: string
    nextDate?: () => void
    prevDate?: () => void
}

export default function Calendar({ date, nextDate, prevDate }: CalendarProps) {
    return (
        <View className='w-full flex-row  items-center  py-4 gap-2'>
            <ButtonIcon nameIcon='chevron-left' size={28} onPress={prevDate} />
            <Text className='text-xl font-bold text-white flex-1 text-center'>
                {date}
            </Text>
            <ButtonIcon nameIcon='chevron-right' size={28} onPress={nextDate} />
        </View>
    )
}
