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
const musicas = ['Lover', 'Your Eyes', 'Hello Stranger'];
const contagem = document.querySelector('.contagem');

const aviso = document.querySelector('.aviso');

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
function montarAvisoDoNomeMusica(musica, musicas) {
    if (musica === '') {
        return 'Escreva o nome da música.';
    }
    if (musicas.includes(musica)) {
        return musica + ' já está na lista.';
    }
    return '';
}

function lerMusica() {
    return musica.value.trim();
}

function limparCampo() {
    musica.value = '';
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
    const musica = lerMusica();
    aviso.textContent = montarAvisoDoNomeMusica(musica, musicas);
    
    if (aviso.textContent === '') {
        musicas.push(musica);
        limparCampo();
        mostrarEspera();
    }
});

botaoTocarDepois.addEventListener('click', function () {
    console.log('clicou em Tocar depois desta');
    const musica = lerMusica();
    aviso.textContent = montarAvisoDoNomeMusica(musica, musicas);
    
    if (aviso.textContent === '') {
        musicas.unshift(musica);
        limparCampo();
        mostrarEspera();
    }
});

botaoRemover.addEventListener('click', function () {
    console.log('clicou em Remover da fila');
    const musica = lerMusica();
    const posicao = musicas.indexOf(musica);
    // aviso.textContent = montarAvisoDoNomeMusica(musica, musicas);

    if (musica  === '') {
        aviso.textContent = 'Escreva o nome da música.';
    } else if (posicao === -1) {
        aviso.textContent = musica + ' não está na lista.';
    } else {
        musicas.splice(posicao, 1);
        aviso.textContent = musica + ' foi removida.';
        limparCampo();
        mostrarEspera();
    }
});

botaoDesfazer.addEventListener('click', function () {
    console.log('clicou em Desfazer ultima');

    if (musicas.length === 0) {
        aviso.textContent = 'Não há músicas na fila.';
    } else {
        const remover = musicas.pop();
        aviso.textContent = remover + ' saiu da fila.';
        mostrarEspera(); 
    }
});
