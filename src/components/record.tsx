import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, Pressable, View } from 'react-native'
import { Link } from 'expo-router'
import { formatDistanceDate } from '@/utils/date'
import { RecordProps } from '@/database/useRecordDatabase'

type RecordDatabaseProps = {
    data: RecordProps
}

export default function Record({ data }: RecordDatabaseProps) {
    const isExpense = data.record_type == 'expense'
    return (
        <Link href={{ pathname: '/details', params: data }} asChild>
            <Pressable className='w-full flex-row gap-4 items-center'>
                <MaterialIcons
                    name={isExpense ? 'payments' : 'attach-money'}
                    size={24}
                    color={isExpense ? colors.red : colors.green}
                />

                <View className='flex-1 flex-col'>
                    <View className='flex-row items-center gap-1'>
                        <Text
                            className='text-xl font-subtitle flex-1 text-gray-300'
                            lineBreakMode='tail'
                            numberOfLines={1}
                        >
                            {data.description}
                        </Text>
                        <Text className='text-sm font-body  text-gray-400'>
                            {formatDistanceDate(data.created_at)}
                        </Text>
                    </View>
                    <Text className='text-base text-gray-400 font-subtitle'>
                        R$ {String(data.value.toFixed(2)).replace('.', ',')}
                    </Text>
                </View>
            </Pressable>
        </Link>
    )
}
