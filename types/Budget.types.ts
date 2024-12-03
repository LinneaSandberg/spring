import { Months } from "@/enum/monthEnum";

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
  variableExpenses: {
    planned: number;
    expenses: VariableExpense[];
  };
}

export interface VariableExpense {
  date: string;
  description: string;
  amount: number;
}
