import { colors } from '@/styles/colors'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { ReactNode } from 'react'
import clsx from 'clsx'

type InputFormProps = {
    label?: string
    children: ReactNode
}

type InputFieldProps = TextInputProps & {
    isDate?: boolean
    toogle?: boolean
}
function InputForm({ label, children }: InputFormProps) {
    return (
        <View className='flex-row items-center mt-4'>
            <Text className='text-white text-base w-1/3'>{label}</Text>
            {children}
        </View>
    )
}

function InputField({
    editable = true,
    isDate = false,
    toogle,
    ...rest
}: InputFieldProps) {
    return (
        <TextInput
            {...rest}
            className={clsx(
                'flex-1 bg-gray-700 px-4 p-2 text-white text-base font-body rounded-lg',
                {
                    'bg-gray-600': editable,
                    'bg-gray-800': isDate && toogle,
                },
            )}
            editable={editable}
            placeholderTextColor={colors.white}
        />
    )
}
InputForm.Field = InputField

export { InputForm }
