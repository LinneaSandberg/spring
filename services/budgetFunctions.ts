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
