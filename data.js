// Função para obter transações do localStorage
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  }
  
  // Função para salvar transações no localStorage
  function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  