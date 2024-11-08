document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    if (localStorage.getItem(username)) {
        alert("Usuário já existe. Escolha um nome de usuário diferente.");
    } else {
        // Armazenar o usuário e senha
        localStorage.setItem(username, JSON.stringify({
            password: password,
            transactions: [] // Armazenar transações do usuário
        }));
        alert("Usuário registrado com sucesso!");
        window.location.href = "login.html"; // Redirecionar para login
    }
});
