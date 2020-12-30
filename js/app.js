const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// add transaction
const addTransaction = e => {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Oops! Please add an item name and amount.');
    } else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value   // converts value into number by adding plus(+) symbol
        };
        transactions.push(transaction);
        displayTransaction(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// generate random id
const generateId = () => {
    return Math.floor(Math.random() * 1000000); // 6 characters
}

// display transaction
const displayTransaction = transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
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

// delete transaction by id
const deleteTransaction = id => {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// update local storage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// init
const init = () => {
    list.innerHTML = '';
    transactions.forEach(displayTransaction);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
