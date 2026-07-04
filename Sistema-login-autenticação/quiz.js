const perguntas = [
    {
        titulo: "Qual linguagem é usada para dar estilo e beleza a uma página web?",
        opcoes: ["HTML", "CSS", "JavaScript", "Python"],
        correta: 1
    },
    {
        titulo: "O que o comando 'localStorage' faz no navegador?",
        opcoes: ["Apaga o histórico", "Salva dados na memória do navegador", "Cria uma animação", "Fecha a janela"],
        correta: 1
    },
    {
        titulo: "Qual tag HTML usamos para criar um botão?",
        opcoes: ["<p>", "<h1>", "<a>", "<button>"],
        correta: 3
    }
];

let perguntaAtual = 0;
let acertos = 0;

// Pré-carrega os áudios na memória com os nomes exatos do site (.m4a)
const somAcerto = new Audio('acertou (mp3cut.net).m4a');
const somErro = new Audio('errou (mp3cut.net).m4a');

// Configurações de volume e carregamento rápido
somAcerto.volume = 1.0;
somAcerto.preload = 'auto';
somErro.volume = 1.0;
somErro.preload = 'auto';

function tocarSom(tipo) {
    if (tipo === 'acerto') {
        somAcerto.currentTime = 0; // Reseta o áudio para o início
        somAcerto.play().catch(erro => console.log("Erro no acerto:", erro));
    } else {
        somErro.currentTime = 0; // Toca o Faustão na hora!
        somErro.play().catch(erro => console.log("Erro no erro:", erro));
    }
}

function carregarPergunta() {
    const card = document.querySelector('.card-quiz');
    if (card) card.style.animation = 'none';
    
    if (perguntaAtual < perguntas.length) {
        setTimeout(() => {
            if (card) card.style.animation = 'entrarPergunta 0.5s ease forwards';
        }, 10);

        document.getElementById("num-atual").innerText = perguntaAtual + 1;
        document.getElementById("texto-pergunta").innerText = perguntas[perguntaAtual].titulo;
        
        for (let i = 0; i < 4; i++) {
            const botao = document.getElementById('op' + i);
            if (botao) {
                botao.innerText = perguntas[perguntaAtual].opcoes[i];
                botao.style.backgroundColor = '#1c1c1c'; // Cor escura padrão
                botao.disabled = false;
            }
        }
    } else {
        document.getElementById("area-pergunta").style.display = "none";
        document.getElementById("area-resultado").style.display = "block";
        document.getElementById("total-acertos").innerText = acertos;
    }
}

function verificarResposta(indiceSelecionado) {
    for (let i = 0; i < 4; i++) {
        const botao = document.getElementById('op' + i);
        if (botao) botao.disabled = true;
    }

    const botaoSelecionado = document.getElementById('op' + indiceSelecionado);
    
    if (indiceSelecionado === perguntas[perguntaAtual].correta) {
        acertos++;
        if (botaoSelecionado) botaoSelecionado.style.backgroundColor = '#2ea44f'; // Verde
        tocarSom('acerto');
    } else {
        if (botaoSelecionado) botaoSelecionado.style.backgroundColor = '#cf222e'; // Vermelho
        tocarSom('erro');
    }
    
    setTimeout(() => {
        perguntaAtual++;
        carregarPergunta();
    }, 1200); // Dá tempo de ouvir o Faustão antes de mudar de pergunta
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    acertos = 0;
    document.getElementById("area-pergunta").style.display = "block";
    document.getElementById("area-resultado").style.display = "none";
    carregarPergunta();
}

// Inicializa o Quiz assim que a página carrega
window.onload = () => {
    carregarPergunta();
};