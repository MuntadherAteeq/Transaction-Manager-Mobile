import React, { createContext, ReactNode, useContext, useState } from "react";

export class Transaction {
  id: string;
  recordId: string;
  date: string;
  amount: number;
  description: string;

  constructor(transaction: {
    id?: string;
    recordId?: string;
    date?: string | Date;
    amount?: number;
    description?: string;
  }) {
    this.id = transaction.id || "0";
    this.recordId = transaction.recordId || "0";
    this.date = transaction.date
      ? new Date(transaction.date).toISOString()
      : new Date().toISOString();
    this.amount = transaction.amount || 0;
    this.description = transaction.description || "";
  }
}
export class Transactions {
  transactions: Transaction[];

  constructor(transactions: Transaction[] = []) {
    this.transactions = transactions;
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  getTransactionsByRecordId(recordId: string): Transaction[] {
    return this.transactions.filter(
      (transaction) => transaction.recordId === recordId
    );
  }
}
// Define the context type
interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getTransactionById: (id: string) => Transaction | undefined;
  getTransactionsByRecordId: (recordId: string) => Transaction[];
}

// Create the context
const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

// Provider component
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const getTransactionById = (id: string) => {
    return transactions.find((t) => t.id === id);
  };

  const getTransactionsByRecordId = (recordId: string) => {
    return transactions.filter((t) => t.recordId === recordId);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
        getTransactionsByRecordId,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook for consuming the context
export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};
