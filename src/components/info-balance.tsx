import { ReactNode } from 'react'
import { Text, View } from 'react-native'

type InfoBalanceProps = {
    children: ReactNode
}

type BalanceProps = {
    title: string
    value: string
}

function InfoBalance({ children }: InfoBalanceProps) {
    return (
        <View className='flex-row  bg-gray-800 justify-center rounded-lg p-4'>
            {children}
        </View>
    )
}

function TextField({ title, value }: BalanceProps) {
    return (
        <View className='flex-1 items-center'>
            <Text className='text-base text-gray-400 font-subtitle'>
                {title}
            </Text>
            <Text
                className='text-base text-gray-300 font-bold'
                lineBreakMode='tail'
                numberOfLines={1}
            >
                R$ {value}
            </Text>
        </View>
    )
}

InfoBalance.Field = TextField

export { InfoBalance }
