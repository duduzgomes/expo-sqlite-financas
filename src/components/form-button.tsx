import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type InfoButtonProps = TouchableOpacityProps & {
    label: string
}

export default function FormButton({ label, ...rest }: InfoButtonProps) {
    return (
        <TouchableOpacity
            {...rest}
            className='bg-gray-800  items-center mt-6 rounded-lg py-2 '
        >
            <Text className='text-base font-heading text-orange-500 py-1'>
                {label}
            </Text>
        </TouchableOpacity>
    )
}
