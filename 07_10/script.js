/* ===========================================================
   Lista de espera — com a lógica de "Tocando agora" e "Próxima".
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

// Seleciona o span dentro do label onde aparece o nome da música atual
const tocandoAtualElemento = document.querySelector('.tocando-atual');

// Variável para guardar a música que está tocando agora
let tocandoAgora = null;

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
        return 'Nenhuma música na fila';
    }
    if (quantidade === 1) {
        return '1 música na fila';
    }
    return quantidade + ' músicas na fila';
}

function mostrarEspera() {
    // Se ainda não tem música tocando, pega automaticamente a primeira da lista
    if (!tocandoAgora && musicas.length > 0) {
        tocandoAgora = musicas.shift(); // Remove a primeira da lista e guarda
    }

    // Atualiza o texto da música que está tocando agora mantendo o visual intacto
    if (tocandoAtualElemento) {
        tocandoAtualElemento.textContent = tocandoAgora ? tocandoAgora : 'Nada tocando';
    }

    // Renderiza o resto da lista e a contagem
    lista.innerHTML = montarItensDaEspera(musicas);
    contagem.textContent = montarTextoDaContagem(musicas.length);
}

// Devolve o problema do nome novo, ou '' se estiver tudo certo.
function montarAvisoDoNomeMusica(nomeMusica, musicasAtuais) {
    if (nomeMusica === '') {
        return 'Escreva o nome da música.';
    }
    if (musicasAtuais.includes(nomeMusica) || nomeMusica === tocandoAgora) {
        return nomeMusica + ' já está na lista ou tocando.';
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

// Botão "Próxima": avança para a próxima música da fila
botaoProximo.addEventListener('click', function () {
    console.log('clicou em Proxima');

    if (musicas.length > 0) {
        tocandoAgora = musicas.shift(); // Pega a próxima da fila e tira de lá
        aviso.textContent = '';
    } else {
        tocandoAgora = null; // Se a lista esvaziou, limpa o tocando agora
        aviso.textContent = 'A fila acabou!';
    }
    
    mostrarEspera();
});

botaoAdicionar.addEventListener('click', function () {
    console.log('clicou em Adicionar ao fim');
    const nomeMusica = lerMusica();
    aviso.textContent = montarAvisoDoNomeMusica(nomeMusica, musicas);
    
    if (aviso.textContent === '') {
        musicas.push(nomeMusica);
        limparCampo();
        mostrarEspera();
    }
});

botaoTocarDepois.addEventListener('click', function () {
    console.log('clicou em Tocar depois desta');
    const nomeMusica = lerMusica();
    aviso.textContent = montarAvisoDoNomeMusica(nomeMusica, musicas);
    
    if (aviso.textContent === '') {
        musicas.unshift(nomeMusica);
        limparCampo();
        mostrarEspera();
    }
});

botaoRemover.addEventListener('click', function () {
    console.log('clicou em Remover da fila');
    const nomeMusica = lerMusica();
    const posicao = musicas.indexOf(nomeMusica);

    if (nomeMusica === '') {
        aviso.textContent = 'Escreva o nome da música.';
    } else if (posicao === -1) {
        aviso.textContent = nomeMusica + ' não está na lista.';
    } else {
        musicas.splice(posicao, 1);
        aviso.textContent = nomeMusica + ' foi removida.';
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