import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("Database");

// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS records (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        date TEXT,
        description TEXT,
        phone TEXT,
        avatar TEXT,
        email TEXT,
        total_amount REAL
      );
`);


