import { Text, Pressable, PressableProps } from 'react-native'

type ButtonNum = PressableProps & {
    label: string
}

export default function ButtonNum({ label, ...rest }: ButtonNum) {
    return (
        <Pressable
            {...rest}
            className='bg-gray-600 py-3 mb-1 items-center justify-center rounded-lg'
        >
            <Text className='text-gray-300 font-heading text-lg'>{label}</Text>
        </Pressable>
    )
}
