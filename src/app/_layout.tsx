import { Loading } from '../components/loading'
import { SQLiteProvider } from 'expo-sqlite'
import { Stack } from 'expo-router'
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { colors } from '@/styles/colors'
import { initializeDatabase } from '@/database/initializeDatabase'

export default function RoutesLayout() {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    })
    if (!fontsLoaded) {
        return <Loading />
    }
    return (
        <SQLiteProvider databaseName='records.db' onInit={initializeDatabase}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.gray[800],
                    },
                    headerTintColor: colors.white,
                }}
            >
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen
                    name='details'
                    options={{
                        title: 'Detalhe do Registro',
                    }}
                />
                <Stack.Screen
                    name='add-record'
                    options={{
                        title: 'Adicionar Registro',
                    }}
                />
            </Stack>
        </SQLiteProvider>
    )
}
