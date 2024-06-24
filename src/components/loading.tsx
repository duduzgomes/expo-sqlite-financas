import { colors } from '@/styles/colors'
import { ActivityIndicator } from 'react-native'

export function Loading() {
    return (
        <ActivityIndicator
            color={colors.orange[300]}
            style={{
                flex: 1,
                backgroundColor: colors.gray[900],
                justifyContent: 'center',
                alignItems: 'center',
            }}
            size='large'
        />
    )
}
