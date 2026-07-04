// ====== 1. FUNÇÃO DE LOGIN ======
function realizarLogin() {
    // Busca o usuário que foi cadastrado no LocalStorage, ou usa o admin como padrão
    const emailCorreto = localStorage.getItem("usuarioEmail") || "admin@email.com";
    const senhaCorreta = localStorage.getItem("usuarioSenha") || "123456";

    // Pega o que o usuário digitou nos campos de Login (index.html)
    const emailDigitado = document.getElementById("campo-email").value;
    const senhaDigitado = document.getElementById("campo-senha").value;

    // VALIDAÇÃO CORRIGIDA: Agora usa exatamente "senhaDigitado" com 'o'
    if (emailDigitado === emailCorreto && senhaDigitado === senhaCorreta) {
        localStorage.setItem('usuarioLogado', 'true'); // Ativa a trava de segurança para liberar a home
        window.location.href = "home.html"; // Redireciona para o quiz
    } else {
        alert("E-mail ou senha incorretos. Tente novamente.");
    }
}

// ====== 2. FUNÇÃO DE CADASTRO ======
function realizarCadastro() {
    // Pega o que o usuário digitou nos campos de Cadastro (cadastro.html)
    const emailCadastrado = document.getElementById("cad-email").value;
    const senhaCadastrada = document.getElementById("cad-senha").value;

    // Verifica se os campos não estão vazios
    if (emailCadastrado === "" || senhaCadastrada === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Salva na memória interna do navegador
    localStorage.setItem("usuarioEmail", emailCadastrado);
    localStorage.setItem("usuarioSenha", senhaCadastrada);

    alert("Conta criada com sucesso! Redirecionando para o login...");
    window.location.href = "index.html";
}