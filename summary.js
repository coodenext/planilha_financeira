document.addEventListener("DOMContentLoaded", function () {
  // Recuperar transações do localStorage
  const transactions = getTransactions();
  let balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  // Atualiza o saldo
  function updateBalance() {
    document.getElementById("balance").innerText = `Saldo Total: R$ ${balance.toFixed(2)}`;
  }

  // Exibe as transações
  function displayTransactions() {
    const transactionsDiv = document.getElementById("transactions");
    transactionsDiv.innerHTML = "";

    if (transactions.length === 0) {
      transactionsDiv.innerHTML = "<p>Sem transações registradas.</p>";
      return;
    }

    transactions.forEach((transaction, index) => {
      const transactionDiv = document.createElement("div");
      transactionDiv.classList.add("transaction", transaction.type);
      transactionDiv.innerHTML = `
        <span>${transaction.description}</span>
        <span>R$ ${transaction.amount.toFixed(2)}</span>
        <span>${transaction.date}</span>
        <button onclick="editTransaction(${index})">Editar</button>
        <button onclick="deleteTransaction(${index})">Excluir</button>
      `;
      transactionsDiv.appendChild(transactionDiv);
    });
  }

  // Editar transação
  window.editTransaction = function (index) {
    const transactions = getTransactions();
    const transaction = transactions[index];

    // Pedir novos valores para edição
    const newDescription = prompt("Editar Descrição", transaction.description);
    const newAmount = parseFloat(prompt("Editar Valor", transaction.amount));

    if (newDescription && !isNaN(newAmount)) {
      // Atualiza a transação com os novos valores
      transaction.description = newDescription;
      transaction.amount = newAmount;

      // Atualiza no localStorage
      saveTransactions(transactions);
      displayTransactions();  // Atualiza a exibição das transações
    }
  };

  // Excluir transação
  window.deleteTransaction = function (index) {
    const transactions = getTransactions();
    transactions.splice(index, 1);  // Remove a transação do array

    // Atualiza no localStorage
    saveTransactions(transactions);
    displayTransactions();  // Atualiza a exibição das transações
  };

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

  // Atualiza o saldo e exibe as transações
  updateBalance();
  displayTransactions();
  createChart();
});

// Funções auxiliares para acessar e salvar transações no localStorage
function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions")) || [];
}

function saveTransactions(transactions) {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

