import { Months } from "@/enum/monthEnum";
import { FieldValue } from "firebase/firestore";
import { Field } from "react-hook-form";

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
  remaningBalance: number;
  plannedExpenses: number | undefined;
  plannedSaving: number | undefined;
  variableExpenses: {
    totalSum: number;
    expenses: VariableExpense[];
  };
  updatedAt?: FieldValue;
}

export interface BudgetFormValues {
  _id?: string;
  month: Months;
  year: number;
  totalIncome: number;
  fixedExpenses: Expenses;
  remaningBalance: number;
  plannedExpenses?: number;
  plannedSaving?: number;
}

export interface VariableExpense {
  _id: string;
  date: Date;
  description: string;
  amount: number;
  necessary: boolean;
}
