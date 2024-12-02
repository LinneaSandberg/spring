import useBudget from "@/hooks/useBudget";
import { View, Text } from "react-native";


const BudgetCard = ({ month, year }: { month: number, year: number }) => {
    const { budget, loading, error } = useBudget(month, year);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    if (!budget) {
        return <Text>No budget found for this month.</Text>;
    }

    return (
        <View>
            <Text>Budget for {month}/{year}</Text>
            <View>
                <Text>Total income: {budget.totalIncome}</Text>
                <Text>Remaining balance: {budget.remaningBalance}</Text>
            </View>

            <View>
                <Text>Entertainment - {budget.fixedExpenses.entertainment}</Text>
                <Text>Health and wellness - {budget.fixedExpenses.healthAndWellness}</Text>
                <Text>Housing costs - {budget.fixedExpenses.housingCosts}</Text>
                <Text>Subscriptions - {budget.fixedExpenses.subscriptions}</Text>
                <Text>Transportation - {budget.fixedExpenses.transportation}</Text>
            </View>
        </View>
    );
};

export default BudgetCard;