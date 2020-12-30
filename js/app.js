const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    {id: 1, text: 'Cellphone', amount: -4600 },
    {id: 2, text: 'Salary', amount: 8500.50 },
    {id: 3, text: 'Online Course', amount: -600 },
    {id: 4, text: 'Gaming Controller', amount: -750 }
];

let transactions = dummyTransactions;

// add transaction
const addTransaction = transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">x</button>
        `;
    
    list.appendChild(item);
}

// update balance
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerHTML = `<span>&#8369</span>${total}`;
    moneyPlus.innerHTML = `<span>&#8369</span>${income}`;
    moneyMinus.innerHTML = `<span>&#8369</span>${expense}`;
}

// init
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransaction);

    updateValues();
}

init();
