import { ReactNode, useEffect, useState } from 'react'
import { Text, Pressable, View, ScrollView } from 'react-native'
import clsx from 'clsx'

type OptionSelect = {
    label: string
    value: string
}

type SelectFieldProps = {
    options: OptionSelect[]
    checkedValue: string
    onChange: (value: string) => void
    disable: boolean
    placeHolder: string
}
type SelectProps = {
    children: ReactNode
    label: string
}

function Select({ children, label }: SelectProps) {
    return (
        <View className='my-2 z-60 mt-4 flex-row max-h-48'>
            <Text className='text-lg text-white w-1/3 py-2 font-body'>
                {label}
            </Text>
            {children}
        </View>
    )
}

function SelectField({
    options,
    checkedValue,
    disable,
    onChange,
    placeHolder,
}: SelectFieldProps) {
    const [activeSelect, setActiveSelect] = useState(false)

    function getLabelFromValue(value: string): string {
        const option = options.find(option => option.value === value)
        return option ? option.label : ''
    }

    function handleChooseSelect(option: OptionSelect) {
        onChange(option.value)
        setActiveSelect(false)
    }

    const selectedLabel = getLabelFromValue(checkedValue)
    return (
        <View
            className={clsx('flex-1 rounded-lg bg-gray-600 w-2/3 pb-1 ', {
                ' bg-gray-700 ': disable,
            })}
        >
            <Pressable
                disabled={disable}
                className={clsx('p-2 z-10', {
                    'border-b border-gray-500': activeSelect,
                })}
                onPress={() => setActiveSelect(prev => !prev)}
            >
                <Text className='text-white text-lg pl-2'>{selectedLabel}</Text>
            </Pressable>

            {activeSelect && (
                <ScrollView className='rounded-lg'>
                    {options.map(option => {
                        return (
                            <Pressable
                                key={option.value}
                                className='bg-gray-600 p-2'
                                onPress={() => handleChooseSelect(option)}
                            >
                                <Text className='text-white text-lg pl-2'>
                                    {option.label}
                                </Text>
                            </Pressable>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
}

Select.Field = SelectField

export { Select }
