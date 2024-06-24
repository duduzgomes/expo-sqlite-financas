import { colors } from '@/styles/colors'
import { Text, Pressable, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

type ButtonAddProps = {
    month: string
    year: string
}

export default function ButtonAdd({ month, year }: ButtonAddProps) {
    return (
        <Link
            href={{ pathname: '/add-record', params: { month, year } }}
            asChild
        >
            <TouchableOpacity className='flex-row bg-gray-800 items-center absolute bottom-4 right-4 px-8 py-4 rounded-full'>
                <MaterialIcons
                    name='add'
                    size={22}
                    color={colors.orange[500]}
                />
                <Text className='font-subtitle text-orange-500 pl-1'>
                    Adicionar
                </Text>
            </TouchableOpacity>
        </Link>
    )
}
