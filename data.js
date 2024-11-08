// Recupera transações do localStorage
function getTransactions() {
    return JSON.parse(localStorage.getItem("transactions")) || [];
}

// Salva transações no localStorage
function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
