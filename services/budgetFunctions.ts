/**
 * The function `calculateMonthlyResult` calculates and returns a summary of the monthly financial
 * outcome based on expenses, savings goals, and budgeting.
 * @param {number} totalSumExpenses - The `totalSumExpenses` parameter represents the total sum of
 * expenses incurred during the month. This includes all the expenses you have paid for within the
 * given period.
 * @param {number | undefined} plannedSavings - Planned savings refer to the amount of money you have
 * set aside or planned to save for a specific period, such as a month. It is a target savings goal
 * that you aim to achieve within that timeframe. In the provided function `calculateMonthlyResult`,
 * the `plannedSavings` parameter represents
 * @param {number} remainingBalance - The `remainingBalance` parameter in the `calculateMonthlyResult`
 * function represents the amount of money you have left in your budget after deducting all your
 * expenses for the month. It is the total balance you have available for savings or additional
 * spending after accounting for your expenses.
 * @param {number} amountAfterBudgetting - The `amountAfterBudgetting` parameter represents the total
 * amount of money you have after budgeting for expenses. This amount is calculated by subtracting your
 * total expenses from your remaining balance.
 * @returns The function `calculateMonthlyResult` returns a string message that includes information
 * about the user's budget status and savings goals for the month. The message will vary based on
 * whether the user stayed within their budget, exceeded it, reached their savings goals, or fell short
 * of their planned savings amount.
 */
export const calculateMonthlyResult = (
  totalSumExpenses: number,
  plannedSavings: number | undefined,
  remainingBalance: number,
  amountAfterBudgetting: number
): string => {
  const totalRemainingBalanceAfterMonth = remainingBalance - totalSumExpenses;
  const budgetDifference = amountAfterBudgetting - totalSumExpenses;

  let result = "";

  if (budgetDifference >= 0) {
    result += `Congratulations! You stayed within your budget with ${budgetDifference} kr left.\n`;
  } else {
    result += `Unfortunately, you exceeded your budget by ${-budgetDifference} kr.\n`;
  }

  if (totalRemainingBalanceAfterMonth >= (plannedSavings ?? 0)) {
    result += `You reached your savings goals! 🥳\n`;
  } else {
    const savingsShortfall =
      (plannedSavings ?? 0) - totalRemainingBalanceAfterMonth;
    result += `You did not meet your savings goals and saved ${savingsShortfall} kr less than planned.\n`;
  }

  return result;
};
