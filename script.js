const form = document.getElementById('transactionForm');
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transactionList");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit",addTransaction);

function addTransaction(event){
    event.preventDefault();
    const transaction={
        id:Date.now(),
        description:descriptionInput.value,
        amount:Number(amountInput.value),
        type:typeInput.value
    };

    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    updateSummary();
    form.reset();
    console.log(transactions);

}

function displayTransactions(){
    transactionList.innerHTML="";
    transactions.forEach(function(transaction){
        const li=document.createElement("li");
        li.innerHTML = `
            <span>
                   ${transaction.description}
            </span>

            <span>
                  AED ${transaction.amount}
            </span>

            <button onclick="deleteTransaction(${transaction.id})">
             Delete
            </button> `; 
        transactionList.appendChild(li);
    });

}

function updateSummary(){
    let totalIncome=0;
    let totalExpense=0;

    transactions.forEach(function(transaction){
        if(transaction.type === "income"){
            totalIncome+=transaction.amount;
        }
        else{ 

            totalExpense +=transaction.amount;
        }
    });


let totalBalance= totalIncome-totalExpense;

income.innerText =`AED ${totalIncome}`;
expense.innerText =`AED ${totalExpense}`;
balance.innerText =`AED ${totalBalance}`;

}

function deleteTransaction(id){
    transactions=transactions.filter(function(transaction){
        return transaction.id !== id;
    });
    saveTransactions();
    displayTransactions();
    updateSummary();
}

function saveTransactions(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

       
    displayTransactions();
    updateSummary();