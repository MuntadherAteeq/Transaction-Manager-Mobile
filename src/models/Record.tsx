import { createContext, ReactNode, useContext, useState } from "react";
import { RecordType } from "../constants/Database";

export class Record implements RecordType {
  id: number;
  name: string;
  date: string;
  description: string;
  phone: string;
  avatar: string;
  email: string;
  total_amount: number;

  constructor(
    id?: number,
    name?: string,
    phone?: string,
    email?: string,
    date?: string,
    avatar?: string,
    description?: string,
    total_amount?: number
  ) {
    this.id = id || 0;
    this.name = name || "";
    this.date = date
      ? new Date(date).toLocaleDateString()
      : new Date().toLocaleDateString();
    this.description = description ? description : "";
    this.total_amount = total_amount || 0;
    this.phone = phone || "";
    this.avatar = avatar || "";
    this.email = email || "";
  }
}

type RecordsContextType = {
  records: Record[];
  addRecord: (record: Record) => void;
  deleteRecord: (id: number) => void;
  updateRecord: (id: number, updated: Partial<Record>) => void;
};

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<Record[]>([]);

  const addRecord = (record: Record) => {
    setRecords((prev) => [...prev, record]);
  };

  const deleteRecord = (id: number) => {
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  const updateRecord = (id: number, updated: Partial<Record>) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, ...updated } : rec))
    );
  };

  return (
    <RecordsContext.Provider
      value={{ records, addRecord, deleteRecord, updateRecord }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = (): RecordsContextType => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};
