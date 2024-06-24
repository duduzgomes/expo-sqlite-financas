import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonNum = TouchableOpacityProps & {
    label: string
}

export default function ButtonNum({ label, ...rest }: ButtonNum) {
    return (
        <TouchableOpacity
            {...rest}
            className='bg-gray-600 py-3 mb-1 items-center justify-center'
        >
            <Text className='text-gray-300 font-heading text-lg'>{label}</Text>
        </TouchableOpacity>
    )
}
