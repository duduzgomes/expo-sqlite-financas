import { colors } from '@/styles/colors'
import { Text, Pressable, TouchableOpacity, View } from 'react-native'
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
            <Pressable className='flex-row bg-gray-800 items-center px-6 py-3 rounded-full absolute right-0 bottom-0 mr-2 mb-2'>
                <MaterialIcons
                    name='add'
                    size={22}
                    color={colors.orange[500]}
                />
                <Text className='font-subtitle text-orange-500 pl-1 text-base'>
                    Adicionar
                </Text>
            </Pressable>
        </Link>
    )
}
