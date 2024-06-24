import {
    dateFormatedIso,
    formatDefaultDate,
    formatDefaultDateIso,
    sumMonth,
} from '@/utils/date'
import { useSQLiteContext } from 'expo-sqlite'
import uuid from 'react-native-uuid'

export type RecordProps = {
    record_id: number
    record_type: string
    type_modality: string
    category: string
    description: string
    value: number
    qtd_installments: number
    num_installment: number
    recurrence_status: string
    group_id: string
    created_at: string
    due_date: string
    record_date: string
}

export type IncomeRecord = {
    record_type: string
    type_modality: string
    category: string
    description: string
    value: number
    due_date: Date
    record_date: Date
}

export type InstallmentRecord = {
    record_type: string
    type_modality: string
    category: string
    description: string
    value: number
    group_id: string
    num_installment: number
    qtd_installments: number
    due_date: Date
    record_date: Date
}

export function useRecordDatabase() {
    const database = useSQLiteContext()

    async function createSingleIncomeRecord(
        record: Omit<IncomeRecord, 'category' | 'due_date'>,
    ) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, description, value, record_date) 
            VALUES ($record_type, $type_modality, $description, $value, $record_date)`,
        )

        try {
            const result = await statement.executeAsync({
                $record_type: record.record_type,
                $type_modality: record.type_modality,
                $description: record.description,
                $value: record.value,
                $record_date: dateFormatedIso(record.record_date),
            })

            const recordId = result.lastInsertRowId
            return recordId
        } catch (error) {
            throw console.log(error)
        }
    }

    async function createInstallmentIncomeRecord(
        record: Omit<
            InstallmentRecord,
            'category' | 'num_installment' | 'group_id'
        >,
    ) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, description, value, num_installment, qtd_installments, due_date, record_date, group_id) 
            VALUES ($record_type, $type_modality, $description, $value, $num_installment, $qtd_installments, $due_date, $record_date, $group_id)`,
        )
        const groupId: string = uuid.v4().toString()

        try {
            for (let i = 0; i < record.qtd_installments; i++) {
                await statement.executeAsync({
                    $record_type: record.record_type,
                    $type_modality: record.type_modality,
                    $description: record.description,
                    $value: record.value,
                    $num_installment: i + 1,
                    $qtd_installments: record.qtd_installments,
                    $due_date: sumMonth(record.due_date, i),
                    $record_date: sumMonth(record.record_date, i),
                    $group_id: groupId,
                })
            }
        } catch (error) {
            throw console.log(error)
        }
    }

    async function createRecurrenceIncomeRecord(
        record: Omit<IncomeRecord, 'category' | 'due_date'>,
    ) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, description, value, recurrence_status, record_date) 
            VALUES ($record_type, $type_modality, $description, $value, 'active', $record_date)`,
        )

        try {
            const result = await statement.executeAsync({
                $record_type: record.record_type,
                $type_modality: record.type_modality,
                $description: record.description,
                $value: record.value,
                $record_date: dateFormatedIso(record.record_date),
            })

            const recordId = result.lastInsertRowId
            return recordId
        } catch (error) {
            throw console.log(error)
        }
    }

    async function createSingleExpenseRecord(record: IncomeRecord) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, category, description, value, record_date, due_date) 
            VALUES ($record_type, $type_modality, $category, $description, $value, $record_date, $due_date)`,
        )

        try {
            const result = await statement.executeAsync({
                $record_type: record.record_type,
                $type_modality: record.type_modality,
                $category: record.category,
                $description: record.description,
                $value: record.value,
                $record_date: dateFormatedIso(record.record_date),
                $due_date: dateFormatedIso(record.due_date),
            })

            const recordId = result.lastInsertRowId
            return recordId
        } catch (error) {
            throw console.log(error)
        }
    }

    async function createInstallmentExpenseRecord(
        record: Omit<InstallmentRecord, 'num_installment' | 'group_id'>,
    ) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, category, description, value, num_installment, qtd_installments, due_date, record_date, group_id) 
            VALUES ($record_type, $type_modality, $category, $description, $value, $num_installment, $qtd_installments, $due_date, $record_date, $group_id)`,
        )
        const groupId = uuid.v4().toString()
        try {
            for (let i = 0; i < record.qtd_installments; i++) {
                await statement.executeAsync({
                    $record_type: record.record_type,
                    $type_modality: record.type_modality,
                    $category: record.category,
                    $description: record.description,
                    $value: record.value,
                    $num_installment: i + 1,
                    $qtd_installments: record.qtd_installments,
                    $due_date: sumMonth(record.due_date, i),
                    $record_date: sumMonth(record.record_date, i),
                    $group_id: groupId,
                })
            }
        } catch (error) {
            throw console.log(error)
        }
    }

    async function createRecurrenceExpenseRecord(record: IncomeRecord) {
        const statement = await database.prepareAsync(
            `INSERT INTO records (record_type, type_modality, category, description, value, recurrence_status, record_date, due_date) 
            VALUES ($record_type, $type_modality, $category, $description, $value, 'active', $record_date, $due_date)`,
        )

        try {
            const result = await statement.executeAsync({
                $record_type: record.record_type,
                $type_modality: record.type_modality,
                $category: record.category,
                $description: record.description,
                $value: record.value,
                $record_date: dateFormatedIso(record.record_date),
                $due_date: dateFormatedIso(record.due_date),
            })

            const recordId = result.lastInsertRowId
            return recordId
        } catch (error) {
            throw console.log(error)
        }
    }

    async function listRecordByDate(month: string, year: string) {
        try {
            const query = `SELECT *
            FROM records
            WHERE strftime('%m', record_date) = ?
            AND strftime('%Y', record_date) = ?
            ORDER BY description ASC`

            const response = await database.getAllAsync<RecordProps>(
                query,
                month,
                year,
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async function listActiveRecurringRecords() {
        try {
            const query = `SELECT *
            FROM records
            WHERE recurrence_status = 'active'`

            const response = await database.getAllAsync<RecordProps>(query)

            return response
        } catch (error) {
            throw error
        }
    }

    async function disableRecurrence(recordId: number) {
        const statement = await database.prepareAsync(
            `UPDATE records SET recurrence_status = 'disable' 
            WHERE record_id = $record_id`,
        )
        try {
            await statement.executeAsync({
                $record_id: String(recordId),
            })
        } catch (error) {
            throw console.log(error)
        }
    }

    async function updateIncomeRecord(
        recordId: number,
        record: Omit<
            IncomeRecord,
            'type_modality' | 'category' | 'record_type' | 'record_date'
        >,
    ) {
        const statement = await database.prepareAsync(
            `UPDATE records 
            SET description = $description, value = $value, due_date = $due_date  
            WHERE record_id = $record_id`,
        )
        try {
            await statement.executeAsync({
                $record_id: recordId,
                $description: record.description,
                $value: record.value,
                $due_date: dateFormatedIso(record.due_date),
            })
        } catch (error) {
            throw console.log(error)
        }
    }

    async function updateExpenseRecord(
        recordId: number,
        record: Omit<
            IncomeRecord,
            'record_type' | 'type_modality' | 'record_date'
        >,
    ) {
        const statement = await database.prepareAsync(
            `UPDATE records 
            SET description = $description, value = $value, due_date = $due_date, category = $category  
            WHERE record_id = $record_id`,
        )
        try {
            await statement.executeAsync({
                $record_id: recordId,
                $category: record.category,
                $description: record.description,
                $value: record.value,
                $due_date: dateFormatedIso(record.due_date),
            })
        } catch (error) {
            throw console.log(error)
        }
    }

    async function searchRecordByDescription(
        month: string,
        year: string,
        search: string,
    ) {
        try {
            const query = `SELECT r.*
            FROM records AS r
            WHERE strftime('%m', r.record_date) = ?
            AND strftime('%Y', r.record_date) = ?
            AND r.description LIKE ?`

            const response = await database.getAllAsync<RecordProps>(
                query,
                month,
                year,
                `%${search}%`,
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async function deleteRecordById(id: number) {
        const statement = await database.prepareAsync(
            `DELETE FROM records WHERE record_id = $record_id`,
        )
        try {
            await statement.executeAsync({
                $record_id: String(id),
            })
        } catch (error) {
            throw console.log(error)
        }
    }

    async function deleteRecordByGroupId(groupId: string) {
        const statement = await database.prepareAsync(
            `DELETE FROM records WHERE group_id = $group_id`,
        )
        try {
            await statement.executeAsync({
                $group_id: groupId,
            })
        } catch (error) {
            throw console.log(error)
        }
    }

    return {
        createSingleIncomeRecord,
        createInstallmentIncomeRecord,
        createRecurrenceIncomeRecord,
        createSingleExpenseRecord,
        createInstallmentExpenseRecord,
        createRecurrenceExpenseRecord,
        deleteRecordById,
        deleteRecordByGroupId,
        updateIncomeRecord,
        updateExpenseRecord,
        listRecordByDate,
        listActiveRecurringRecords,
        searchRecordByDescription,
        disableRecurrence,
    }
}
