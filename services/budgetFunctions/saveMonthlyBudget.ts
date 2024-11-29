import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { MonthlyBudget } from "@/types/Budget.types";

const saveMonthlyBudget = async (userId: string, budget: MonthlyBudget) => {
  try {
    const budgetDocRef = doc(
      db,
      "users",
      userId,
      "budgets",
      `${budget.year}-${budget.month}`
    );

    // checks if the document already exists
    const existingDoc = await getDoc(budgetDocRef);

    if (existingDoc.exists()) {
      console.error("Budget already exists for this month");
      return;
    }

    const totalFixedExpenses = budget.fixedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const remainingBalance = budget.totalIncome - totalFixedExpenses;

    await setDoc(budgetDocRef, {
      ...budget,
      totalFixedExpenses,
      remainingBalance,
      createdAt: new Date(),
    });

    console.log("Budget saved successfully");
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error(error.message);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An error occurred while saving the budget");
    }
  }
};

export default saveMonthlyBudget;
