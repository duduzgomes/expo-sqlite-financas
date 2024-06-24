import { ReactNode, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
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
}

function Select({ children }: SelectProps) {
    return <View className=''>{children}</View>
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
            className={clsx(
                'flex-1 rounded-lg bg-gray-600 py-1 max-h-52 w-2/3 absolute r-0 z-20 right-0 ',
                {
                    ' bg-gray-700 ': disable,
                },
            )}
        >
            <TouchableOpacity
                disabled={disable}
                className={clsx('p-2 z-10', {
                    'border-b border-gray-500': activeSelect,
                })}
                onPress={() => setActiveSelect(prev => !prev)}
            >
                <Text className='text-white text-base'>{selectedLabel}</Text>
            </TouchableOpacity>

            {activeSelect && (
                <ScrollView className='rounded-lg max-h-52'>
                    {options.map(option => {
                        return (
                            <TouchableOpacity
                                key={option.value}
                                className='bg-gray-600 p-2'
                                onPress={() => handleChooseSelect(option)}
                            >
                                <Text className='text-white text-base'>
                                    {option.label}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            )}
        </View>
    )
}

Select.Field = SelectField

export { Select }
