// Função para obter transações do localStorage
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  }
  
  // Função para salvar transações no localStorage
  function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }
  // Função para recuperar transações do usuário logado
function getTransactions() {
    const currentUser = localStorage.getItem("currentUser");
    return JSON.parse(localStorage.getItem(`transactions_${currentUser}`)) || [];
  }
  
  // Função para salvar transações do usuário logado
  function saveTransactions(transactions) {
    const currentUser = localStorage.getItem("currentUser");
    localStorage.setItem(`transactions_${currentUser}`, JSON.stringify(transactions));
  }
   