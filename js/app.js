const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    {id: 1, text: 'Cellphone', amount: -4600 },
    {id: 2, text: 'Salary', amount: 5000 },
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

// init
const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransaction);
}

init();
