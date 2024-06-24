import { colors } from '@/styles/colors'
import { ReactNode } from 'react'
import { View, TextInput, TextInputProps } from 'react-native'

type InputProps = {
    children: ReactNode
}

function Input({ children }: InputProps) {
    return (
        <View className='h-14 p-4 rounded-lg bg-gray-800 flex-row '>
            {children}
        </View>
    )
}

function InputField({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className='flex-1 font-normal text-base text-white pl-4'
            placeholderTextColor={colors.white}
            cursorColor={colors.orange[300]}
            {...rest}
        />
    )
}

Input.Field = InputField

export { Input }
