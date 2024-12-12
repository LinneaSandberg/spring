export const calculateMonthlyResult = (
  totalSumExpenses: number,
  plannedSavings: number | undefined,
  remainingBalance: number,
  amountAfterBudgetting: number
): string => {
  const totalRemainingBalanceAfterMonth = remainingBalance - totalSumExpenses;
  const diffrenceTotalRemainingBalanceAfterMonth =
    amountAfterBudgetting - totalRemainingBalanceAfterMonth;

  const budgetDifference = amountAfterBudgetting - totalSumExpenses;

  let result = "";

  // if (diffrenceTotalRemainingBalanceAfterMonth > 0) {
  //   result += `Du har ${diffrenceTotalRemainingBalanceAfterMonth} kr kvar av din budgeterade summa.\n`;
  // } else if (diffrenceTotalRemainingBalanceAfterMonth < 0) {
  //   result += `Du har överskridit din budgeterade summa med ${-diffrenceTotalRemainingBalanceAfterMonth} kr.\n`;
  // } else {
  //   result += `Du har använt exakt din budgeterade summa.\n`;
  // }

  if (budgetDifference >= 0) {
    result += `Grattis! Du höll dig inom budgeten med ${budgetDifference} kr kvar.\n`;
  } else {
    result += `Tyvärr överskred du budgeten med ${-budgetDifference} kr.\n`;
  }

  console.log(
    "totalRemainingBalanceAfterMonth",
    totalRemainingBalanceAfterMonth
  );

  if (totalRemainingBalanceAfterMonth >= (plannedSavings ?? 0)) {
    result += `Du nådde dina sparmål! 🥳\n`;
  } else {
    const savingsShortfall =
      (plannedSavings ?? 0) - totalRemainingBalanceAfterMonth;
    result += `Du nådde inte dina sparmål och sparade ${savingsShortfall} kr mindre än planerat.\n`;
  }

  return result;
};
