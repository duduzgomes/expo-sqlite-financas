import { Text, PressableProps, Pressable } from 'react-native'

type InfoButtonProps = PressableProps & {
    label: string
}

export default function FormButton({ label, ...rest }: InfoButtonProps) {
    return (
        <Pressable
            {...rest}
            className='bg-gray-800  items-center mt-6 rounded-lg py-2 '
        >
            <Text className='text-lg font-heading text-orange-500 py-1'>
                {label}
            </Text>
        </Pressable>
    )
}
