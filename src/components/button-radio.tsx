import { colors } from '@/styles/colors'
import { Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type OptionRadio = {
    label: string
    value: string
}

type ButtonRadioProps = {
    options: OptionRadio[]
    checkedValue: string
    onChange: (value: string) => void
}

export default function ButtonRadio({
    options,
    checkedValue,
    onChange,
}: ButtonRadioProps) {
    return (
        <View className='flex-row gap-6'>
            {options.map(option => {
                let active = option.value == checkedValue
                return (
                    <TouchableOpacity
                        className='flex-row items-center'
                        key={option.value}
                        onPress={() => onChange(option.value)}
                    >
                        <MaterialIcons
                            name={
                                active
                                    ? 'radio-button-checked'
                                    : 'radio-button-unchecked'
                            }
                            size={22}
                            color={colors.white}
                        />
                        <Text className='text-white text-base font-subtitle pl-2'>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
