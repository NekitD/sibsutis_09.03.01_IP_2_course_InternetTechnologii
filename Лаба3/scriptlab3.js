class Rate {
    constructor(p_buy, p_sell, p_date) {
        this.buy = p_buy;
        this.sell = p_sell;
        this.date = p_date;
    }

    readRate() {
        return `Buy: ${this.buy}; Sell: ${this.sell}; Date: ${this.date}.`
    }

    updateRateField(field, p_value) {
        switch (field) {
            case "buy": this.buy = p_value; break;
            case "sell": this.sell = p_value; break;
            case "date": this.date = p_value; break;
            default: console.log(`Field ${field} doesn't exist in the rate.`)
        }
    }

    updateRate(p_buy, p_sell, p_date) {
        this.buy = p_buy;
        this.sell = p_sell;
        this.date = p_date;
    }

    getRate(field) {
        switch (field) {
            case "buy": return this.buy;
            case "sell": return this.sell;
            case "date": return this.date;
            default: console.log(`Field ${field} doesn't exist in the rate.`); return null;
        }
    }

    deleteRate() {
        delete this.buy;
        delete this.sell;
        delete this.date;
    }
}


class Currency {
    constructor(p_name) {
        this.name = p_name;
        this.rateArray = [];
    }

    getCurrency(ind) {
        if (ind >= 0 && ind < this.rateArray.length) {
            return this.rateArray[ind].readRate();
        } else {
            console.log(`Index ${ind} doesn't exist in the array.`);
            return null;
        }
    }

    readCurrency() {
        return this.rateArray.map((data, ind) => `${ind}: ${data.read()}`).join("\n");
    }


    addRate(p_buy, p_sell, p_date) {
        let data = new Rate(p_buy, p_sell, p_date);
        this.rateArray.push(data);
    }

    updateCurrency(ind, p_buy, p_sell, p_date) {
        if (ind >= 0 && ind < this.rateArray.length) {
            this.rateArray[ind].deleteRate();
            this.rateArray[ind] = new Rate(p_buy, p_sell, p_date);
        } else {
            console.log(`Index ${ind} doesn't exist in the array.`)
        }
    }

    deleteCurrency() {
        delete this.name;
        delete this.rateArray;
    }
}

class ExpenseType {
    constructor(p_name) {
        this.name = p_name;
    }

    readExpenseType() {
        return this.name;
    }

    updateExpenseType(p_name) {
        this.name = p_name;
    }

    deleteExpenseType() {
        delete this.name;
    }

}

class IncomeType {
    constructor(p_name) {
        this.name = p_name;
    }

    readIncomeType() {
        return this.name;
    }

    updateIncomeType(p_name) {
        this.name = p_name;
    }

    deleteIncomeType() {
        delete this.name;
    }
}

class Expense {
    constructor(p_nominal, p_currency, p_type, p_date) {
        this.nominal = p_nominal;
        this.currency = p_currency;
        this.type = p_type;
        this.date = p_date;
    }

    getExpenseField(field) {
        switch (field) {
            case "nominal": return this.nominal;
            case "currency": return this.currency;
            case "type": return this.type;
            case "date": return this.date;
            default: console.log(`Field ${field} doesn't exist in the expense.`); return null;
        }
    }

    readExpense() {
        return `Nominal: ${this.nominal}, Currency: ${this.currency}  Type: ${this.type}, Date: ${this.date}`;
    }

    updateExpenseField(field, p_value) {
        switch (field) {
            case "nominal": this.nominal = p_value;
            case "currency": this.currency = p_value;
            case "type": this.type = p_value;
            case "date": this.date = p_value;
            default: console.log(`Field ${field} doesn't exist in the expense.`); return null;
        }
    }

    updateExpense(p_nominal, p_currency, p_type, p_date) {
        this.nominal = p_nominal;
        this.currency = p_currency;
        this.type = p_type;
        this.date = p_date;
    }

    deleteExpense() {
        delete this.nominal;
        delete this.currency;
        delete this.type;
        delete this.date;
    }
}

class Income {
    constructor(p_nominal, p_currency, p_type, p_date) {
        this.nominal = p_nominal;
        this.currency = p_currency;
        this.type = p_type;
        this.date = p_date;
    }

    getIncomeField(field) {
        switch (field) {
            case "nominal": return this.nominal;
            case "currency": return this.currency;
            case "type": return this.type;
            case "date": return this.date;
            default: console.log(`Field ${field} doesn't exist in the income.`); return null;
        }
    }

    readIncome() {
        return `Nominal: ${this.nominal}, Currency: ${this.currency}  Type: ${this.type}, Date: ${this.date}`;
    }

    updateIncomeField(field, p_value) {
        switch (field) {
            case "nominal": this.nominal = p_value;
            case "currency": this.currency = p_value;
            case "type": this.type = p_value;
            case "date": this.date = p_value;
            default: console.log(`Field ${field} doesn't exist in the income.`); return null;
        }
    }

    updateIncome(p_nominal, p_currency, p_type, p_date) {
        this.nominal = p_nominal;
        this.currency = p_currency;
        this.type = p_type;
        this.date = p_date;
    }

    deleteExpense() {
        delete this.nominal;
        delete this.currency;
        delete this.type;
        delete this.date;
    }
}


class Budget {
    constructor() {
        this.currencyArray = [];
        this.incomeTypeArray = [];
        this.expenseTypeArray = [];
        this.incomeArray = [];
        this.expenseArray = [];
    }
    addCurrency(p_name, p_buy, p_sell, p_date) {
        let data = new Currency(p_name);
        data.addRate(p_buy, p_sell, p_date);
        this.currencyArray.push(data);
    }

    addIncomeType(p_name) {
        let data = new IncomeType(p_name);
        this.incomeTypeArray.push(data);
    }

    addExpenseType(p_name) {
        let data = new ExpenseType(p_name);
        this.expenseTypeArray.push(data);
    }

    addIncome(p_nominal, p_currency, p_type, p_date) {
        let data = new Income(p_nominal, p_currency, p_type, p_date);
        this.incomeArray.push(data);
    }

    addExpense(p_nominal, p_currency, p_type, p_date) {
        let data = new Expense(p_nominal, p_currency, p_type, p_date);
        this.expenseArray.push(data);
    }


    updateBudgetField(ind, p_data) {
        if (p_data instanceof Currency && ind >= 0 && ind < this.currencyArray.length) {
            this.currencyArray[ind] = p_data;
        } else if (p_data instanceof IncomeType && ind >= 0 && ind < this.incomeTypeArray.length) {
            this.incomeTypeArray[ind] = p_data;
        } else if (p_data instanceof ExpenseType && ind >= 0 && ind < this.expenseTypeArray.length) {
            this.expenseTypeArray[ind] = p_data;
        } else if (p_data instanceof Income && ind >= 0 && ind < this.incomeArray.length) {
            this.incomeArray[ind] = p_data;
        } else if (p_data instanceof Expense && ind >= 0 && ind < this.expenseArray.length) {
            this.expenseArray[ind] = p_data;
        } else {
            console.log(`Index ${ind} doesn't exist in the budget`);
        }
    }


    updateBudget(p_currency, p_incomeType, p_expenseType, p_income, p_expense) {
        if (p_currency instanceof Currency) {
            this.currencyArray.push(p_currency);
        }
        if (p_incomeType instanceof IncomeType) {
            this.incomeTypeArray.push(p_incomeType);
        }
        if (p_expenseType instanceof ExpenseType) {
            this.expenseTypeArray.push(p_expenseType);
        }
        if (p_income instanceof Income) {
            this.expenseTypeArray.push(p_expenseType);
        }
        if (p_expense instanceof Expense) {
            this.expenseTypeArray.push(p_expenseType);
        }
    }

    getBudget(field) {
        switch (field) {
            case "currency":
                return this.currencyArray.map((data, ind) => `${ind + 1}: Currency ${data.name}:\n` + data.rateArray.map(() => `  Buy - ${data.rate.buy}, Sell - ${data.rate.sell}, Date - ${data.rate.date}`).join("\n")).join("\n\n");
            case "expensetype":
                return this.expenseTypeArray.map((data, ind) => `ExpenceType ${ind + 1}: ${data.name}`).join("\n");
            case "incometype":
                return this.incomeTypeArray.map((data, ind) => `IncomeType ${ind + 1}: ${data.name}`).join("\n");
            case "expense":
                return this.expenseArray.map((data, ind) => `Expense ${ind + 1}: ${data.readExpense()}`).join("\n");
            case "income":
                return this.incomeArray.map((data, ind) => `Income ${ind + 1}: ${data.readIncome()}`).join("\n");
            default:
                console.log(`${field} is not found.`);
                return null;
        }
    }

    getBudgetFieldInd(field, ind) {
        switch (field) {
            case "currency": if (ind >= 0 && ind < currencyArray.length) {
                return `Currency: ${this.currencyArray[ind].name}\n` +
                    this.currencyArray[ind].rateArray.map(data => `  ${data.readRate()}`).join("\n");
            }
            case "expensetype":
                if (ind >= 0 && ind < expenseTypeArray.length) {
                    return `ExpenseType: ${this.expenseTypeArray[ind].name}`;
                }

            case "incometype":
                if (ind >= 0 && ind < incomeTypeArray.length) {
                    return `IncomeType: ${this.incomeTypeArray[ind].name}`;
                }

            case "expense":
                if (ind >= 0 && ind < expenseArray.length) {
                    return `Expense: ${this.expenseArray[ind].readExpense()}`;
                }

            case "income":
                if (ind >= 0 && ind < incomeArray.length) {
                    return `Income: ${this.incomeArray[ind].readIncome()}`;
                }

            default:
                console.log(`Array ${field} is not found.`);
                return null;
        }
    }

    Filter(field, p_type, begin, end) {
        let filterArray = [];

        if (field === 'income') {
            for (let inc of this.incomeArray) {
                if (inc.type === p_type && new Date(inc.date) >= new Date(begin) && new Date(inc.date) <= new Date(end)) {
                    filterArray.push(inc);
                }
            }
        }
        else if (field === 'expense') {
            for (let exp of this.expenseArray) {
                if (exp.type === p_type && new Date(exp.date) >= new Date(begin) && new Date(exp.date) <= new Date(end)) {
                    filterArray.push(exp);
                }
            }
        }
        else {
            console.log(`Field ${field} is not found.`);
        }
        return filterArray;
    }


    getExchangeRate(fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) return 1;

        const from = this.currencyArray.find(currency => currency.name === fromCurrency);
        const to = this.currencyArray.find(currency => currency.name === toCurrency);

        if (!from || !to) {
            console.log(`Currency exchange rate not found for ${fromCurrency} or ${toCurrency}`);
            return null;
        }

        return from.rateArray[0].sell / to.rateArray[0].buy;
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        const rate = this.getExchangeRate(fromCurrency, toCurrency);
        if (rate === null) {
            console.log(`Unable to convert from ${fromCurrency} to ${toCurrency}`);
            return null;
        }
        return amount * rate;
    }

    Balance(p_typeIncome, p_typeExpense, p_currency, begin, end) {
        let incomeSum = 0;
        let expenseSum = 0;

        for (let inc of this.incomeArray) {
            if (inc.type === p_typeIncome && new Date(inc.date) >= new Date(begin) && new Date(inc.date) <= new Date(end)) {
                const converted = this.convertCurrency(inc.nominal, inc.currency, p_currency);
                if (converted !== null) incomeSum += converted;
            }
        }
        for (let exp of this.expenseArray) {
            if (exp.type === p_typeExpense && new Date(exp.date) >= new Date(begin) && new Date(exp.date) <= new Date(end)) {
                const converted = this.convertCurrency(exp.nominal, exp.currency, p_currency);
                if (converted !== null) expenseSum += converted;
            }
        }

        return (incomeSum - expenseSum);
    }

    deleteBudget() {
        delete this.currencyArray;
        delete this.expenseArray;
        delete this.expenseTypeArray;
        delete this.incomeArray;
        delete this.incomeTypeArray;
    }
}


let budget = new Budget();

budget.addIncomeType("Salary");
budget.addIncomeType("Wages");

budget.addExpenseType("food");
budget.addExpenseType("taxes");

budget.addCurrency("USD", 100, 90, "2024-10-10");
budget.addCurrency("RUB", 1, 1, "2024-10-10");


budget.addIncome(20000, "RUB", "Salary", "2024-10-12");
budget.addIncome(500, "USD", "Wages", "2024-10-15");

budget.addExpense(100, "USD", "food", "2024-10-13");
budget.addExpense(7000, "RUB", "taxes", "2024-10-16");

console.log("INCOME:");
console.log(budget.getBudget("income"));
console.log("EXPENSES:");
console.log(budget.getBudget("expense"));

let updateIncome = new Income(50000, "RUB", "Salary", "2024-10-12");

budget.updateBudgetField(0, updateIncome);
console.log("\nIncome + update:");
console.log(budget.getBudget("income"));

let filterIncomes = budget.Filter("income", "Salary", "2024-10-10", "2024-10-20");
console.log("\nFilter(Salary) from 10-10-2024 to 20-10-2024:");
filterIncomes.forEach((incom, ind) => { console.log(`Income ${ind + 1}: ${incom.nominal} ${incom.currency}, Date: ${incom.date}`); });

let balance = budget.Balance("Salary", "taxes", "RUB", "2024-10-10", "2024-10-20");
console.log("\nBalance (Salary - taxes) from 10-10-2024 to 20-10-2024:", balance);

balance = budget.Balance("Wages", "food", "USD", "2024-10-10", "2024-10-20");
console.log("\nBalance (Wages - food) from 10-10-2024 to 20-10-2024:", balance);

balance = budget.Balance("Salary", "food", "RUB", "2024-10-10", "2024-10-20");
console.log("\nBalance (Salary - food) from 10-10-2024 to 20-10-2024:", balance);
