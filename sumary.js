// Recupera as transações do localStorage
const transactions = getTransactions();

// Calcula o saldo total
let balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

// Função para atualizar o saldo total na página
function updateBalance() {
    document.getElementById("balance").innerText = `Saldo Total: R$ ${balance.toFixed(2)}`;
}

// Função para exibir as transações na página de resumo
function displayTransactions() {
    const transactionsDiv = document.getElementById("transactions");
    transactionsDiv.innerHTML = "";

    if (transactions.length === 0) {
        transactionsDiv.innerHTML = "<p>Sem transações registradas.</p>";
        return;
    }

    transactions.forEach(transaction => {
        const transactionDiv = document.createElement("div");
        transactionDiv.classList.add("transaction", transaction.type);
        transactionDiv.innerHTML = `
            <span>${transaction.description}</span>
            <span>R$ ${transaction.amount.toFixed(2)}</span>
        `;
        transactionsDiv.appendChild(transactionDiv);
    });
}

// Função para criar o gráfico
function createChart() {
    const ctx = document.getElementById("transactionChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: transactions.map(transaction => transaction.description),
            datasets: [{
                label: "Valor das Transações",
                data: transactions.map(transaction => Math.abs(transaction.amount)),
                backgroundColor: transactions.map(transaction =>
                    transaction.type === "income" ? "rgba(46, 204, 113, 0.5)" : "rgba(231, 76, 60, 0.5)"
                ),
                borderColor: transactions.map(transaction =>
                    transaction.type === "income" ? "rgba(46, 204, 113, 1)" : "rgba(231, 76, 60, 1)"
                ),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Inicializa a página de resumo
updateBalance();
displayTransactions();
createChart();