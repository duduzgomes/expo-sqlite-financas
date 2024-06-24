import { colors } from '@/styles/colors'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type IconProps = TouchableOpacityProps & {
    nameIcon: keyof typeof MaterialIcons.glyphMap
    size?: number
    color?: string
}

export default function ButtonIcon({
    nameIcon,
    size = 24,
    color = colors.gray[400],
    ...rest
}: IconProps) {
    return (
        <TouchableOpacity {...rest} className='flex-row '>
            <MaterialIcons name={nameIcon} size={size} color={color} />
        </TouchableOpacity>
    )
}
