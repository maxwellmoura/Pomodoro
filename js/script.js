    document.addEventListener('DOMContentLoaded', () => {
    const minutosDisplay = document.getElementById('minutos');
    const segundosDisplay = document.getElementById('segundos');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const anotacaoTextarea = document.getElementById('anotacao');
    const salvarAnotacaoButton = document.getElementById('salvarAnotacao');
    const limparAnotacaoButton = document.getElementById('limparAnotacao');

    let intervalo;
    let tempoRestante = 25 * 60; 

    // Função para atualizar o display do tempo
    function atualizarDisplay() {
        const minutos = Math.floor(tempoRestante / 60);
        const segundos = tempoRestante % 60;
        minutosDisplay.textContent = `${minutos}:`;
        segundosDisplay.textContent = segundos < 10 ? `0${segundos}` : segundos;
    }

    // Função para iniciar o timer
    function iniciarTimer() {
        if (intervalo) return; 
        intervalo = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                atualizarDisplay();
            } else {
                clearInterval(intervalo);
                alert('Tempo esgotado!');
            }
        }, 1000);
    }

    // Função para pausar o timer
    function pausarTimer() {
        clearInterval(intervalo);
        intervalo = null;
    }

    // Função para resetar o timer
    function resetarTimer() {
        clearInterval(intervalo);
        intervalo = null;
        tempoRestante = 25 * 60;
        atualizarDisplay();
    }

    // Função para salvar anotações no localStorage
    function salvarAnotacao() {
        const anotacao = anotacaoTextarea.value;
        localStorage.setItem('anotacao', JSON.stringify(anotacao));
        alert('Anotação salva com sucesso!');
    }

    // Função para carregar anotações do localStorage
    function carregarAnotacao() {
        const anotacaoSalva = localStorage.getItem('anotacao');
        if (anotacaoSalva) {
            anotacaoTextarea.value = JSON.parse(anotacaoSalva);
        }
    }

    // Função para limpar anotações
    function limparAnotacao() {
        anotacaoTextarea.value = '';
        localStorage.removeItem('anotacao');
        alert('Anotação limpa com sucesso!');
    }

    // Event Listeners
    startButton.addEventListener('click', iniciarTimer);
    pauseButton.addEventListener('click', pausarTimer);
    resetButton.addEventListener('click', resetarTimer);
    salvarAnotacaoButton.addEventListener('click', salvarAnotacao);
    limparAnotacaoButton.addEventListener('click', limparAnotacao);

    // Carregar anotação ao carregar a página
    carregarAnotacao();

    // Inicializar o display
    atualizarDisplay();
});
