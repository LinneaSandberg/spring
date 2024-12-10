import { Months } from "@/enum/monthEnum";
import { Timestamp } from "firebase/firestore";

export interface Expenses {
  housingCosts: number;
  transportation: number;
  subscriptions: number;
  healthAndWellness: number;
  entertainment: number;
}

export interface Budget {
  _id?: string;
  month: Months;
  year: number;
  totalIncome: number;
  fixedExpenses: Expenses;
  remainingBalance: number;
  plannedExpenses: number | undefined;
  plannedSaving: number | undefined;
  amountAfterBudgetting: number;
  variableExpenses: {
    totalSum: number;
    expenses: VariableExpense[];
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BudgetFormValues {
  _id?: string;
  month: Months;
  year: number;
  totalIncome: number;
  fixedExpenses: Expenses;
  remainingBalance: number;
  plannedExpenses?: number;
  plannedSaving?: number;
}

export interface VariableExpense {
  _id: string;
  date: Timestamp;
  description: string;
  amount: number;
  necessary: boolean;
}

export interface ExpenseFormValues {
  date: Date;
  description: string;
  amount: number;
  necessary: boolean;
}
