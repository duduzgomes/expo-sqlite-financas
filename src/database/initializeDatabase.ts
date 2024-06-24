import { SQLiteDatabase } from 'expo-sqlite'

export async function initializeDatabase(database: SQLiteDatabase) {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS records(
            record_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            record_type TEXT NOT NULL,
            type_modality TEXT NOT NULL,
            category TEXT,
            description TEXT NOT NULL,
            value FLOAT NOT NULL,
            qtd_installments INTEGER,
            num_installment INTEGER,
            recurrence_status TEXT,
            group_id TEXT,
            created_at DATE NOT NULL DEFAULT (CURRENT_DATE),
            due_date DATE,
            record_date DATE NOT NULL DEFAULT (CURRENT_DATE),
            CHECK (record_type IN ('income', 'expense'))
            CHECK (type_modality IN ('single', 'installment', 'recurrent'))
            CHECK (recurrence_status IN ('active', 'disable'))
        );
    `)
}

// INSERT INTO (record_type, type_modality, description, value) - receita unica
// INSERT INTO (record_type, type_modality, description, value,num_installment ,qtd_installments, due_date) - receita parcelada
// INSERT INTO (record_type, type_modality, description, value, recurrence_status, due_date) - receita recorrente

// INSERT INTO (record_type, type_modality, category, description, value) - despesa unica
// INSERT INTO (record_type, type_modality, category, description, value, num_installment, qtd_installments, due_date) - despesa parcelada
// INSERT INTO (record_type, type_modality, category, description, value, recurrence_status, due_date) - despesa recorrente
