import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "db.json");

const readDb = () => JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
const writeDb = (data) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

export const getRecords = () => readDb().records;
export const getUsers = () => readDb().users;

export const saveRecord = (record) => {
  const db = readDb();
  db.records.push(record);
  writeDb(db);
  return record;
};

export const updateRecordInDb = (id, data) => {
  const db = readDb();
  const idx = db.records.findIndex((r) => r.id === parseInt(id));
  if (idx === -1) return null;
  db.records[idx] = { ...db.records[idx], ...data };
  writeDb(db);
  return db.records[idx];
};

export const deleteRecordFromDb = (id) => {
  const db = readDb();
  const initial = db.records.length;
  db.records = db.records.filter((r) => r.id !== parseInt(id));
  if (db.records.length === initial) return false;
  writeDb(db);
  return true;
};

export const saveUsers = (data) => {
  const db = readDb();
  db.users = data;
  writeDb(db);
  return db.users;
};
