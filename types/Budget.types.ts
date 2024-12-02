import { Months } from "@/enum/monthEnum";

export interface Expenses {
  housingCosts: number | null;
  transportation: number | null;
  subscriptions: number | null;
  healthAndWellness: number | null;
  entertainment: number | null;
}

export interface Budget {
  month: Months;
  year: number;
  totalIncome: number;
  fixedExpenses: Expenses;
  variableExpenses: {
    planned: number;
    expenses: VariableExpense[];
  };
}

interface VariableExpense {
  date: string;
  description: string;
  amount: number;
}
