document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        localStorage.setItem("loggedInUser", username); // Armazena o usuário logado
        window.location.href = "summary.html"; // Redireciona para a página de resumo
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

