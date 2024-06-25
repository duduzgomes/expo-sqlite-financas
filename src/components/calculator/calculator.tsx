import { Modal, Text, TouchableOpacity, View } from 'react-native'
import ButtonNum from './button-num'
import { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

type CalculatorProps = {
    onPress: (value: string) => void
    visible: (state: boolean) => void
}

export default function Calculator({ onPress, visible }: CalculatorProps) {
    const [previous, setPrevious] = useState('')
    const [current, setCurrent] = useState('')
    const [operation, setOperation] = useState('')
    const [label, setLabel] = useState('')
    const [updateState, setUpdateState] = useState(false)

    useEffect(() => {
        if (updateState) {
            setPrevious(current)
            setCurrent('')
            setLabel(prev => prev + operation)
            setUpdateState(false)
        }
    }, [updateState, current, operation])

    function chooseOperation(operation: string) {
        if (current == '') {
            setCurrent(operation)
        }
        if (previous != '') {
            calculate()
        } else {
            setOperation(operation)
            setPrevious(current)
            setCurrent('')
            setLabel(prev => prev + operation)
        }
        setOperation(operation)
    }

    function calculate(equals = false) {
        let result
        const prev = parseFloat(previous)
        const curr = parseFloat(current)

        switch (operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '/':
                result = (prev / curr).toFixed(2)
                break

            default:
                break
        }
        setCurrent(String(result))
        setLabel(String(result))

        if (equals) {
            setPrevious('')
            return
        }
        setUpdateState(true)
    }

    function addNum(num: string) {
        if (current.includes('.') && num == '.') return
        setCurrent(prev => prev + num)
        setLabel(prev => prev + num)
    }

    function finish() {
        onPress(current)
        deleteNum()
        visible(false)
    }

    function deleteNum() {
        setPrevious('')
        setCurrent('')
        setLabel('')
    }

    return (
        <View className='absolute w-screen bottom-0 z-40 flex-1'>
            <View className='bg-gray-800 p-2 gap-2'>
                <View className='bg-gray-600 p-2 items-end h-10 rounded-lg'>
                    <Text className='text-white text-lg -tracking-wide'>
                        {label}
                    </Text>
                </View>
                <View className='flex-row justify-between space-x-1'>
                    {/* coluna 1 */}
                    <View className='flex-1'>
                        <ButtonNum label='1' onPress={() => addNum('1')} />
                        <ButtonNum label='4' onPress={() => addNum('4')} />
                        <ButtonNum label='7' onPress={() => addNum('7')} />
                        <ButtonNum label='.' onPress={() => addNum('.')} />
                    </View>
                    {/* coluna 2 */}
                    <View className='flex-1'>
                        <ButtonNum label='2' onPress={() => addNum('2')} />
                        <ButtonNum label='5' onPress={() => addNum('5')} />
                        <ButtonNum label='8' onPress={() => addNum('8')} />
                        <ButtonNum label='0' onPress={() => addNum('0')} />
                    </View>
                    {/* coluna 3 */}
                    <View className='flex-1'>
                        <ButtonNum label='3' onPress={() => addNum('3')} />
                        <ButtonNum label='6' onPress={() => addNum('6')} />
                        <ButtonNum label='9' onPress={() => addNum('9')} />
                        <ButtonNum label='=' onPress={() => calculate(true)} />
                    </View>
                    {/* coluna 4 */}
                    <View className='flex-1'>
                        <ButtonNum
                            label='÷'
                            onPress={() => chooseOperation('/')}
                        />
                        <ButtonNum
                            label='x'
                            onPress={() => chooseOperation('*')}
                        />
                        <ButtonNum
                            label='+'
                            onPress={() => chooseOperation('+')}
                        />
                        <ButtonNum
                            label='-'
                            onPress={() => chooseOperation('-')}
                        />
                    </View>
                    <View className='flex-1 space-y-1 pb-1'>
                        <TouchableOpacity
                            className='bg-gray-600 justify-center items-center flex-1 rounded-lg'
                            onPress={() => deleteNum()}
                        >
                            <Text className='text-lg font-heading text-white'>
                                CE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='bg-gray-600 justify-center items-center py-10 rounded-lg'
                            onPress={finish}
                        >
                            <MaterialIcons
                                name='check'
                                size={24}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}
