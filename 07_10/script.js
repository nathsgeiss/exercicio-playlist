/* ===========================================================
   Lista de espera — os eventos, sem lógica nenhuma ainda.

   Cada ouvinte só avisa no console que funcionou.
   =========================================================== */


/* -----------------------------------------------------------
   Selecionar
   ----------------------------------------------------------- */

const botaoProximo = document.querySelector('.botao-proximo');
const musica = document.querySelector('.musica');

const botaoAdicionar = document.querySelector('.botao-adicionar');
const botaoTocarDepois = document.querySelector('.botao-tocar-depois');
const botaoRemover = document.querySelector('.botao-remover');
const botaoDesfazer = document.querySelector('.botao-desfazer');

const lista = document.querySelector('.lista');
const musicas = ['APT', 'Die With A Smile', 'BIRDS OF FEATHER'];
const contagem = document.querySelector('.contagem');

// Um <li> para cada nome da lista.
function montarItensDaEspera(espera) {
    let itens = '';
    for (let i = 0; i < espera.length; i++) {
        itens = itens + `<li>${espera[i]}</li>`;
    }
    return itens;
}

function montarTextoDaContagem(quantidade) {
    if (quantidade === 0) {
        return '3 músicas na fila';
    }
    if (quantidade === 1) {
        return '1 música na fila';
    }
    return quantidade + ' músicas na fila';
}

function mostrarEspera() {
    lista.innerHTML = montarItensDaEspera(musicas);
    contagem.textContent = montarTextoDaContagem(musicas.length);
}

// Devolve o problema do nome novo, ou '' se estiver tudo certo.
function montarAvisoDoNovoNome(nome, espera) {
    if (nome === '') {
        return 'Escreva o nome.';
    }
    if (espera.includes(nome)) {
        return nome + ' já está na lista.';
    }
    return '';
}

mostrarEspera(); 

/* -----------------------------------------------------------
   Escutar
   ----------------------------------------------------------- */

// input: dispara a cada letra digitada
musica.addEventListener('input', function () {
    console.log('digitou: ' + musica.value);
});

// submit: o botão "Entrar na fila" e o Enter no campo
// cadastro.addEventListener('submit', function (evento) {
//     evento.preventDefault();
//     console.log('enviou o cadastro: entrar na fila');
// });

// click: uma vez por clique
botaoProximo.addEventListener('click', function () {
    console.log('clicou em Proxima');
});

botaoAdicionar.addEventListener('click', function () {
    console.log('clicou em Adicionar ao fim');
});

botaoTocarDepois.addEventListener('click', function () {
    console.log('clicou em Tocar depois desta');
});

botaoRemover.addEventListener('click', function () {
    console.log('clicou em Remover da fila');
});

botaoDesfazer.addEventListener('click', function () {
    console.log('clicou em Desfazer ultima');
});
