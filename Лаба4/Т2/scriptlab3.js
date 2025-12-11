class Currency {
    constructor(name, rate, date) {
        this.name = name;
        this.rate = rate;
        this.date = new Date(date);
    }
}

class CurrencyManager {
    constructor() {
        this.buyCurrencies = [];
        this.sellCurrencies = [];
    }

    async addCurrency(type, currency) {
        if (type === "buy") {
            this.buyCurrencies.push(currency);
            try {
                await saveData('buycurrency', this.buyCurrencies);
                console.log('Данные для покупки валют успешно сохранены.');
            }
            catch (error) {
                console.error('Ошибка при сохранении данных для покупки валют:', error);
            }
        }
        else if (type === "sell") {
            this.sellCurrencies.push(currency);
            try {
                await saveData('sellcurrency', this.sellCurrencies);
                console.log('Данные для продажи валют успешно сохранены.');
            }
            catch (error) {
                console.error('Ошибка при сохранении данных для продажи валют:', error);
            }
        }
        this.updateTables();
    }

    async deleteCurrency(type, index) {
        if (type === "buy") {
            this.buyCurrencies.splice(index, 1);
            try {
                await saveData('buycurrency', this.buyCurrencies);
                console.log('Данные для покупки валют успешно сохранены.');
            }
            catch (error) {
                console.error('Ошибка при сохранении данных для покупки валют:', error);
            }
        }
        else if (type === "sell") {
            this.sellCurrencies.splice(index, 1);
            try {
                await saveData('sellcurrency', this.sellCurrencies);
                console.log('Данные для продажи валют успешно сохранены.');
            }
            catch (error) {
                console.error('Ошибка при сохранении данных для продажи валют:', error);
            }
        }
        this.updateTables();
    }

    getLatestRate(currencyName) {
        if (currencyName === "рубль" || currencyName === "RUB") {
            return 1;
        }

        const currencyRecords = this.sellCurrencies.filter(currency => currency.name === currencyName);

        if (currencyRecords.length === 0) {
            console.log(`Курс для валюты "${currencyName}" не найден.`);
            return null;
        }

        const latestCurrency = currencyRecords.sort((a, b) => b.date - a.date)[0];
        return latestCurrency ? latestCurrency.rate : null;
    }

    getLatestRateForBuying(currencyName) {
        if (currencyName === "рубль" || currencyName === "RUB") {
            return 1;
        }

        const currencyRecords = this.buyCurrencies.filter(currency => currency.name === currencyName);

        if (currencyRecords.length === 0) {
            console.log(`Курс для валюты "${currencyName}" не найден.`);
            return null;
        }

        const latestCurrency = currencyRecords.sort((a, b) => b.date - a.date)[0];
        return latestCurrency ? latestCurrency.rate : null;
    }

    updateTables(selectedTypes = [], startDate = null, endDate = null) {
        const buyTable = document.getElementById("buyTable").getElementsByTagName("tbody")[0];
        const sellTable = document.getElementById("sellTable").getElementsByTagName("tbody")[0];

        buyTable.innerHTML = "";
        sellTable.innerHTML = "";

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const filteredBuyCurrencies = this.buyCurrencies.filter(currency => {
            const currencyDate = new Date(currency.date);

            const isDateInRange = (!start || currencyDate >= start) && (!end || currencyDate <= end);
            const isTypeIncluded = selectedTypes.length === 0 || selectedTypes.includes(currency.name.toUpperCase());

            return isDateInRange && isTypeIncluded;
        });

        filteredBuyCurrencies.forEach((currency, index) => {
            const row = buyTable.insertRow();
            row.innerHTML = `
                <td>${currency.name}</td>
                <td>${currency.rate}</td>
                <td>${new Date(currency.date).toLocaleDateString()}</td>
                <td><button onclick="openEditCurrencyModal('buy', ${index})">Редактировать</button></td>
                <td><button onclick="removeCurrencyFromTable(this, 'buy')">Удалить</button></td>`;
        });

        const filteredSellCurrencies = this.sellCurrencies.filter(currency => {
            const currencyDate = new Date(currency.date);

            const isDateInRange = (!start || currencyDate >= start) && (!end || currencyDate <= end);
            const isTypeIncluded = selectedTypes.length === 0 || selectedTypes.includes(currency.name.toUpperCase());

            return isDateInRange && isTypeIncluded;
        });

        filteredSellCurrencies.forEach((currency, index) => {
            const row = sellTable.insertRow();
            row.innerHTML = `
                <td>${currency.name}</td>
                <td>${currency.rate}</td>
                <td>${new Date(currency.date).toLocaleDateString()}</td>
                <td><button onclick="openEditCurrencyModal('sell', ${index})">Редактировать</button></td>
                <td><button onclick="removeCurrencyFromTable(this, 'sell')">Удалить</button></td>`;
        });
    }
}

function openEditCurrencyModal(type, index) {
    const currency = type === 'buy' ? currencyManager.buyCurrencies[index] : currencyManager.sellCurrencies[index];


    document.getElementById('editCurrencyName').value = currency.name;
    document.getElementById('editCurrencyRate').value = currency.rate;


    const formattedDate = new Date(currency.date).toISOString().split('T')[0];
    document.getElementById('editCurrencyDate').value = formattedDate;


    document.getElementById('editCurrencyForm').dataset.type = type;
    document.getElementById('editCurrencyForm').dataset.index = index;

    document.getElementById('editCurrencyModal').style.display = 'block';
}


function closeEditCurrencyModal() {
    document.getElementById('editCurrencyModal').style.display = 'none';
}


async function saveEditedCurrency() {
    const type = document.getElementById('editCurrencyForm').dataset.type;
    const index = parseInt(document.getElementById('editCurrencyForm').dataset.index, 10);

    const targetArray = type === 'buy' ? currencyManager.buyCurrencies : currencyManager.sellCurrencies;
    const fileName = type === 'buy' ? 'buycurrency' : 'sellcurrency';

    if (index >= 0 && targetArray[index]) {
        targetArray[index].name = document.getElementById('editCurrencyName').value.trim();
        targetArray[index].rate = parseFloat(document.getElementById('editCurrencyRate').value);
        targetArray[index].date = document.getElementById('editCurrencyDate').value;


        currencyManager.updateTables();
        try {
            await saveData(fileName, targetArray);
            console.log('Данные для расходов успешно сохранены.');
        }
        catch (error) {
            console.error('Ошибка при сохранении данных для расходов:', error);
        }
        closeEditCurrencyModal();
    }
    else {
        alert("Ошибка: не удалось сохранить изменения. Элемент не найден.");
    }
}

// модальное окно валюты
function openAddCurrencyModal() {
    document.getElementById('currencyModal').style.display = 'block';
}

function closeAddCurrencyModal() {
    document.getElementById('currencyModal').style.display = 'none';
}

// Добавление валюты из модального окна
function addCurrency() {
    const type = document.getElementById('currencyType').value;
    const name = document.getElementById('currencyName').value.trim().toUpperCase();
    const rate = parseFloat(document.getElementById('currencyRate').value);
    const date = document.getElementById('currencyDate').value;

    if (!name || isNaN(rate) || !date) {
        alert('Заполните все поля');
        return;
    }

    const newCurrency = new Currency(name, rate, new Date(date));
    currencyManager.addCurrency(type, newCurrency);
    closeAddCurrencyModal();
}

// Удаление валюты из таблицы
function removeCurrencyFromTable(button, type) {
    const row = button.closest('tr');
    const rowIndex = row.rowIndex - 1;

    currencyManager.deleteCurrency(type, rowIndex);
}

const currencyManager = new CurrencyManager();
class ExpenseType {
    constructor(name) {
        this.name = name;
    }

}
class IncomeType {
    constructor(name) {
        this.name = name;
    }
}
class Expense {
    constructor(value, type, date, currency) {
        this.value = value;
        this.type = type;
        this.date = date;
        this.currency = currency;
    }
}

class ExpenseManager {
    constructor() {
        this.expenses = [];
    }


    async addExpense(expense) {
        this.expenses.push(expense);
        this.updateExpenseTable();
        try {
            await saveData('expense', this.expenses);
            console.log('Данные для расходов успешно сохранены.');
        }
        catch (error) {
            console.error('Ошибка при сохранении данных для расходов:', error);
        }
    }

    // Обновление таблицы + фильтр
    updateExpenseTable(startDate = null, endDate = null) {
        const expenseTable = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];
        expenseTable.innerHTML = "";

        let totalAmount = 0;

        this.expenses.forEach((expense, index) => {
            const expenseDate = new Date(expense.date);

            if ((startDate && expenseDate < startDate) || (endDate && expenseDate > endDate)) {
                return;
            }

            if (selectedExpenseTypes.length > 0 && !selectedExpenseTypes.includes(expense.type)) {
                return;
            }

            let expenseInRUB = expense.value;

            if (expense.currency !== "рубль" && expense.currency !== "RUB") {
                const rate = currencyManager.getLatestRateForBuying(expense.currency);
                if (rate === null) {
                    expenseInRUB = "Курс не найден";
                }
                else {
                    expenseInRUB = expense.value * rate;
                }
            }

            const row = expenseTable.insertRow();
            row.innerHTML = `
                <td>${expense.type}</td>
                <td>${expense.value} ${expense.currency}</td>
                <td>${expenseInRUB} ₽</td>
                <td><button onclick="openEditExpenseModal(${index})">Редактировать</button></td>
                <td><button onclick="expenseManager.deleteExpense(${index})">Удалить</button></td>
            `;

            if (typeof expenseInRUB === "number") {
                totalAmount += expenseInRUB;
            }
        });

        document.getElementById("totalExpenseAmount").textContent = totalAmount + " ₽";
    }

    async deleteExpense(index) {
        this.expenses.splice(index, 1);
        this.updateExpenseTable();
        try {
            await saveData('expense', this.expenses);
            console.log('Данные для расходов успешно сохранены.');
        }
        catch (error) {
            console.error('Ошибка при сохранении данных для расходов:', error);
        }
    }
}

// окно редактирования расхода
function openEditExpenseModal(index) {
    const expense = expenseManager.expenses[index];

    document.getElementById('editExpenseValue').value = expense.value;
    document.getElementById('editExpenseType').value = expense.type;
    document.getElementById('editExpenseDate').value = expense.date;
    document.getElementById('editExpenseCurrency').value = expense.currency;

    document.getElementById('editExpenseForm').dataset.index = index;

    document.getElementById('editExpenseModal').style.display = 'block';
}

function closeEditExpenseModal() {
    document.getElementById('editExpenseModal').style.display = 'none';
}

async function saveEditedExpense() {
    const index = document.getElementById('editExpenseForm').dataset.index;

    expenseManager.expenses[index].value = parseFloat(document.getElementById('editExpenseValue').value);
    expenseManager.expenses[index].type = document.getElementById('editExpenseType').value;
    expenseManager.expenses[index].date = document.getElementById('editExpenseDate').value;
    expenseManager.expenses[index].currency = document.getElementById('editExpenseCurrency').value;

    expenseManager.updateExpenseTable();
    try {
        await saveData('expense', expenseManager.expenses);
        console.log('Данные для расходов успешно сохранены.');
    }
    catch (error) {
        console.error('Ошибка при сохранении данных для расходов:', error);
    }
    closeEditExpenseModal();
}

function addExpense() {
    const value = parseFloat(document.getElementById("expenseValue").value);
    const type = document.getElementById("expenseType").value;
    const date = document.getElementById("expenseDate").value;
    const currency = document.getElementById("expenseCurrency").value;

    if (value && type && date && currency) {
        const newExpense = new Expense(value, type, date, currency);
        expenseManager.addExpense(newExpense);
        closeAddExpenseModal();
    }
    else {
        alert("Пожалуйста, заполните все поля!");
    }
}

// модальное окно расхода
function openAddExpenseModal() {
    document.getElementById("expenseModal").style.display = "block";
}

function closeAddExpenseModal() {
    document.getElementById("expenseModal").style.display = "none";
}
class Income {
    constructor(value, type, date, currency) {
        this.value = value;
        this.type = type;
        this.date = date;
        this.currency = currency;
    }
}

class IncomeManager {
    constructor() {
        this.incomes = [];
    }

    async addIncome(income) {
        this.incomes.push(income);
        this.updateIncomeTable();
        try {
            await saveData('income', this.incomes);
            console.log('Данные для доходов успешно сохранены.');
        }
        catch (error) {
            console.error('Ошибка при сохранении данных для доходов:', error);
        }
    }

    updateIncomeTable(startDate = null, endDate = null) {
        const incomeTable = document.getElementById('incomesTable').getElementsByTagName('tbody')[0];
        incomeTable.innerHTML = "";

        let totalAmount = 0;

        this.incomes.forEach((income, index) => {
            const incomeDate = new Date(income.date);

            if ((startDate && incomeDate < startDate) || (endDate && incomeDate > endDate)) {
                return;
            }

            if (selectedIncomeTypes.length > 0 && !selectedIncomeTypes.includes(income.type)) {
                return;
            }

            let incomeInRUB = income.value;

            if (income.currency !== "рубль" && income.currency !== "RUB") {
                const rate = currencyManager.getLatestRate(income.currency);
                if (rate === null) {
                    incomeInRUB = "Курс не найден";
                }
                else {
                    incomeInRUB = income.value * rate;
                }
            }

            const row = incomeTable.insertRow();
            row.innerHTML = `
                <td>${income.type}</td>
                <td>${income.value} ${income.currency}</td>
                <td>${incomeInRUB} ₽</td>
                <td><button onclick="openEditIncomeModal(${index})">Редактировать</button>
                <button onclick="incomeManager.deleteIncome(${index})">Удалить</button></td>`;

            if (typeof incomeInRUB === "number") {
                totalAmount += incomeInRUB;
            }
        });

        document.getElementById('totalIncomeAmount').textContent = totalAmount + `₽`;
    }

    async deleteIncome(index) {
        this.incomes.splice(index, 1);
        this.updateIncomeTable();
        try {
            await saveData('income', this.incomes);
            console.log('Данные для доходов успешно сохранены.');
        }
        catch (error) {
            console.error('Ошибка при сохранении данных для доходов:', error);
        }
    }
}

// окно редактирования дохода
function openEditIncomeModal(index) {
    const income = incomeManager.incomes[index];

    document.getElementById('editIncomeValue').value = income.value;
    document.getElementById('editIncomeType').value = income.type;
    document.getElementById('editIncomeDate').value = income.date;
    document.getElementById('editIncomeCurrency').value = income.currency;

    document.getElementById('editIncomeForm').dataset.index = index;

    document.getElementById('editIncomeModal').style.display = 'block';
}

function closeEditIncomeModal() {
    document.getElementById('editIncomeModal').style.display = 'none';
}

async function saveEditedIncome() {
    const index = document.getElementById('editIncomeForm').dataset.index;

    incomeManager.incomes[index].value = parseFloat(document.getElementById('editIncomeValue').value);
    incomeManager.incomes[index].type = document.getElementById('editIncomeType').value;
    incomeManager.incomes[index].date = document.getElementById('editIncomeDate').value;
    incomeManager.incomes[index].currency = document.getElementById('editIncomeCurrency').value;

    incomeManager.updateIncomeTable();
    try {
        await saveData('income', incomeManager.incomes);
        console.log('Данные для доходов успешно сохранены.');
    }
    catch (error) {
        console.error('Ошибка при сохранении данных для доходов:', error);
    }
    closeEditIncomeModal();
}

// Модальное окно дохода
function openAddIncomeModal() {
    document.getElementById("incomeModal").style.display = "block";
}

function closeAddIncomeModal() {
    document.getElementById("incomeModal").style.display = "none";
}

function addIncome() {
    const value = parseFloat(document.getElementById("incomeValue").value);
    const type = document.getElementById("incomeType").value;
    const date = document.getElementById("incomeDate").value;
    const currency = document.getElementById("incomeCurrency").value;

    if (value && type && date && currency) {
        const newIncome = new Income(value, type, date, currency);
        incomeManager.addIncome(newIncome);
        closeAddIncomeModal();
    }
    else {
        alert("Пожалуйста, заполните все поля!");
    }
}
const incomeManager = new IncomeManager();
const expenseManager = new ExpenseManager();

class Budget {
    constructor() {
        this.incomes = [];
        this.expenses = [];
        this.currencies = [];
    }

    deleteIncome(index) {
        this.incomes.splice(index, 1);
    }

    editIncome(index, newData) {
        this.incomes[index] = { ...this.incomes[index], ...newData };
    }

    getIncomes() {
        return this.incomes;
    }

    deleteExpense(index) {
        this.expenses.splice(index, 1);
    }

    editExpense(index, newData) {
        this.expenses[index] = { ...this.expenses[index], ...newData };
    }

    getExpenses() {
        return this.expenses;
    }


    deleteCurrency(type, index) {
        console.log(`Удаление из ${type}, индекс: ${index}`);
        if (type === "buy") {
            this.buyCurrencies.splice(index, 1);
        }
        else if (type === "sell") {
            this.sellCurrencies.splice(index, 1);
        }
        this.updateTables();
    }
}
const budget = new Budget();
// страницы
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }

    // кнопки
    const addCurrencyButton = document.getElementById('addCurrencyButton');
    const addIncomeButton = document.getElementById('addIncomeButton');

    if (pageId === 'settings') {
        addCurrencyButton.style.display = 'block';
        addIncomeButton.style.display = 'none';
    }
    else if (pageId === 'incomes') {
        addIncomeButton.style.display = 'block';
        addCurrencyButton.style.display = 'none';
    }
    else {
        addCurrencyButton.style.display = 'none';
        addIncomeButton.style.display = 'none';
    }

    const links = document.querySelectorAll('.sidebar a');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
}
// Фильтры
function applyExpenseDateFilter() {
    const startDate = document.getElementById("expenseFilterStartDate").value;
    const endDate = document.getElementById("expenseFilterEndDate").value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    expenseManager.updateExpenseTable(start, end);
}

function applyIncomeDateFilter() {
    const startDate = document.getElementById("incomeFilterStartDate").value;
    const endDate = document.getElementById("incomeFilterEndDate").value;

    const start = new Date(startDate);
    const end = new Date(endDate);

    incomeManager.updateIncomeTable(start, end);
}

function applyCurrencyDateFilter() {
    const startDate = document.getElementById('currencyFilterStartDate').value;
    const endDate = document.getElementById('currencyFilterEndDate').value;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const selectedTypes = selectedCurrencyTypes || [];

    currencyManager.updateTables(selectedTypes, start, end);
}
function applyDateFilter() {
    handleCalculateBalance();
}

function handleCalculateBalance() {
    const startDate = document.getElementById('filterStartDate').value;
    const endDate = document.getElementById('filterEndDate').value;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    let totalBalance = 0;

    const filteredIncomes = incomeManager.incomes.filter(income => {
        const incomeDate = new Date(income.date);
        const isWithinDate = (!start || incomeDate >= start) && (!end || incomeDate <= end);
        const isTypeIncluded = selectedIncomeTypes.length === 0 || selectedIncomeTypes.includes(income.type);
        return isWithinDate && isTypeIncluded;
    });

    filteredIncomes.forEach(income => {
        let incomeInRUB = income.value;
        if (income.currency !== "рубль" && income.currency !== "RUB") {
            const rate = currencyManager.getLatestRate(income.currency);
            if (rate !== null) {
                incomeInRUB *= rate;
            }
            else {
                incomeInRUB = 0;
            }
        }
        totalBalance += incomeInRUB;
    });
    const filteredExpenses = expenseManager.expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const isWithinDate = (!start || expenseDate >= start) && (!end || expenseDate <= end);
        const isTypeIncluded = selectedExpenseTypes.length === 0 || selectedExpenseTypes.includes(expense.type);
        return isWithinDate && isTypeIncluded;
    });

    filteredExpenses.forEach(expense => {
        let expenseInRUB = expense.value;
        if (expense.currency !== "рубль" && expense.currency !== "RUB") {
            const rate = currencyManager.getLatestRateForBuying(expense.currency);
            if (rate !== null) {
                expenseInRUB *= rate;
            }
            else {
                expenseInRUB = 0;
            }
        }
        totalBalance -= expenseInRUB;
    });

    document.getElementById("balanceResult").textContent = `${totalBalance.toFixed(2)} ₽`;

    updateBalanceChart(filteredIncomes, filteredExpenses);
}

function updateBalanceChart(filteredIncomes, filteredExpenses) {
    const ctx = document.getElementById('balanceChart').getContext('2d');

    if (window.balanceChart instanceof Chart) {
        window.balanceChart.destroy();
    }

    const allData = [...filteredIncomes, ...filteredExpenses];
    const uniqueDates = Array.from(new Set(allData.map(data => new Date(data.date).toLocaleDateString()))).sort();

    const balances = [];
    let cumulativeBalance = 0;

    uniqueDates.forEach(date => {
        const incomeSum = filteredIncomes
            .filter(income => new Date(income.date).toLocaleDateString() === date)
            .reduce((sum, income) => sum + income.value, 0);

        const expenseSum = filteredExpenses
            .filter(expense => new Date(expense.date).toLocaleDateString() === date)
            .reduce((sum, expense) => sum + expense.value, 0);

        cumulativeBalance += incomeSum - expenseSum;
        balances.push(cumulativeBalance);
    });

    const data =
    {
        labels: uniqueDates,
        datasets:
            [
                {
                    label: 'Баланс (₽)',
                    data: balances,
                    borderColor: 'rgba(0, 123, 255, 1)',
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderWidth: 2,
                    fill: true
                }
            ]
    };

    const config =
    {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales:
            {
                x:
                {
                    title:
                    {
                        display: true,
                        text: 'Дата'
                    }
                },
                y:
                {
                    title:
                    {
                        display: true,
                        text: 'Баланс (₽)'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    window.balanceChart = new Chart(ctx, config);
}

let selectedIncomeTypes = [];
let selectedExpenseTypes = [];
let selectedCurrencyTypes = [];

function openTypeFilterModal() {
    document.getElementById('typeFilterModal').style.display = 'block';
}

function closeTypeFilterModal() {
    document.getElementById('typeFilterModal').style.display = 'none';
}

function openIncomeTypeFilterModal() {
    document.getElementById('incomeTypeFilterModal').style.display = 'block';
}


function closeIncomeTypeFilterModal() {
    document.getElementById('incomeTypeFilterModal').style.display = 'none';
}


function openExpenseTypeFilterModal() {
    document.getElementById('expenseTypeFilterModal').style.display = 'block';
}


function closeExpenseTypeFilterModal() {
    document.getElementById('expenseTypeFilterModal').style.display = 'none';
}

function openCurrencyTypeFilterModal() {
    document.getElementById('currencyTypeFilterModal').style.display = 'block';
}

function closeCurrencyTypeFilterModal() {
    document.getElementById('currencyTypeFilterModal').style.display = 'none';
}
function applyTypeFilter() {
    const incomeInput = document.getElementById('incomeTypeFilterInput').value;
    const expenseInput = document.getElementById('expenseTypeFilterInput').value;

    selectedIncomeTypes = incomeInput ? incomeInput.split(',').map(type => type.trim()) : [];
    selectedExpenseTypes = expenseInput ? expenseInput.split(',').map(type => type.trim()) : [];

    handleCalculateBalance();
    closeTypeFilterModal();
}

function clearTypeFilter() {
    selectedIncomeTypes = [];
    selectedExpenseTypes = [];
    document.getElementById('incomeTypeFilterInput').value = '';
    document.getElementById('expenseTypeFilterInput').value = '';

    handleCalculateBalance();
}

function applyIncomeTypeFilter() {
    const input = document.getElementById('incomeTypeFilterInput').value;
    selectedIncomeTypes = input ? input.split(',').map(type => type.trim()) : [];
    incomeManager.updateIncomeTable();
    closeIncomeTypeFilterModal();
}

function clearIncomeTypeFilter() {
    selectedIncomeTypes = [];
    document.getElementById('incomeTypeFilterInput').value = '';
    incomeManager.updateIncomeTable();
}

function applyExpenseTypeFilter() {
    const input = document.getElementById('expenseTypeFilterInput').value;
    selectedExpenseTypes = input ? input.split(',').map(type => type.trim()) : [];
    expenseManager.updateExpenseTable();
    closeExpenseTypeFilterModal();
}

function clearExpenseTypeFilter() {
    selectedExpenseTypes = [];
    document.getElementById('expenseTypeFilterInput').value = '';
    expenseManager.updateExpenseTable();
}

function applyCurrencyTypeFilter() {
    const input = document.getElementById('currencyTypeFilterInput').value.trim();
    selectedCurrencyTypes = input ? input.split(',').map(type => type.trim().toUpperCase()) : [];

    const startDate = document.getElementById('currencyFilterStartDate').value;
    const endDate = document.getElementById('currencyFilterEndDate').value;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    closeCurrencyTypeFilterModal();
    currencyManager.updateTables(selectedCurrencyTypes, start, end);
}

function clearCurrencyTypeFilter() {
    document.getElementById('currencyTypeFilterInput').value = '';
    selectedCurrencyTypes = [];
    closeCurrencyTypeFilterModal();
    currencyManager.updateTables(selectedCurrencyTypes);
}

async function saveData(entity, data) {
    try {
        const response = await fetch(`http://localhost:3000/${entity}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
    }
    catch (error) {
        console.error(`Ошибка сохранения данных для ${entity}:`, error);
    }
}


async function loadData(entity) {
    try {
        const response = await fetch(`http://localhost:3000/${entity}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных для ${entity}: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(`Ошибка загрузки данных для ${entity}:`, error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const buyCurrencies = await loadData('buycurrency');
        currencyManager.buyCurrencies = buyCurrencies;
        currencyManager.updateTables();

        const sellCurrencies = await loadData('sellcurrency');
        currencyManager.sellCurrencies = sellCurrencies;
        currencyManager.updateTables();

        const incomes = await loadData('income');
        incomeManager.incomes = incomes;
        incomeManager.updateIncomeTable();

        const expenses = await loadData('expense');
        expenseManager.expenses = expenses;
        expenseManager.updateExpenseTable();

        console.log('Все данные успешно загружены и таблицы обновлены.');
    }
    catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});
