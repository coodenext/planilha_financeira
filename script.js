function addTransaction(isIncome) {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!description || isNaN(amount) || amount <= 0) {
      alert("Por favor, insira uma descrição e um valor válido.");
      return;
    }

    const transaction = {
      description: description,
      amount: isIncome ? amount : -amount,
      type: isIncome ? "income" : "expense"
    };

    const transactions = getTransactions();
    transactions.push(transaction);
    saveTransactions(transactions);

    // Limpa os campos após adicionar
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    alert("Transação adicionada com sucesso!");
}
