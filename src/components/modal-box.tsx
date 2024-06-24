import { Modal, Text, TouchableOpacity, View } from 'react-native'

type ModalBoxProps = {
    title: string
    message: string
    onConfirm: () => void
    onCancel?: () => void
    visible: boolean
    type: 'confirm' | 'alert'
}

export default function ModalBox({
    title,
    message,
    onConfirm,
    onCancel,
    visible,
    type,
}: ModalBoxProps) {
    const isAlert = type == 'alert'

    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <View className='flex-1 justify-center items-center p-2'>
                <View className=' bg-zinc-800 border-white shadow-sm  rounded-lg'>
                    <View className=' bg-zinc-900 rounded-t-lg p-2'>
                        <Text className='text-base font-heading text-white'>
                            {title}
                        </Text>
                    </View>
                    <View className='items-center justify-center px-4 py-6'>
                        <Text className='text-white text-base font-normal'>
                            {message}
                        </Text>
                    </View>
                    <View className='flex-row  p-3 gap-4 justify-end'>
                        {!isAlert && (
                            <TouchableOpacity
                                className='bg-red p-2 px-4 rounded-md'
                                onPress={onCancel}
                            >
                                <Text className='text-sm font-normal'>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            className='bg-green p-2 px-4 rounded-md'
                            onPress={onConfirm}
                        >
                            <Text className='text-sm font-normal'>
                                {isAlert ? 'OK' : 'Confirmar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
