import { Months } from "@/enum/monthEnum";

export interface Expenses {
  housingCosts: number | null;
  transportation: number | null;
  subscriptions: number | null;
  healthAndWellness: number | null;
  entertainment: number | null;
}

interface FixedExpenses {
  name: string;
  amount: number;
}

export interface MonthlyBudget {
  month: Months;
  year: number;
  totalIncome: number;
  fixedExpenses: FixedExpenses[];
}
