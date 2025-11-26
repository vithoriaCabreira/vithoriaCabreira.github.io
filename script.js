const STORAGE_KEY = 'projeto2_dados_usuarios';

// Função para carregar dados do LocalStorage
function carregarDados() {
    const dados = localStorage.getItem(STORAGE_KEY);
    return dados ? JSON.parse(dados) : [];
}

// Função para salvar dados no LocalStorage
function salvarDados(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

// 1. Função para Cadastrar Usuário
document.getElementById('form-usuario').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataAtual = new Date().toLocaleString();

    const novoUsuario = {
        nome: nome,
        email: email,
        data: dataAtual
    };

    const listaUsuarios = carregarDados();
    listaUsuarios.push(novoUsuario);
    
    salvarDados(listaUsuarios);
    renderizarLista();
    limparFormulario();
});

// 2. Função para Renderizar a Lista (Exibe os dados na tela)
function renderizarLista(filtro = '') {
    const listaUsuarios = carregarDados();
    const ul = document.getElementById('lista-usuarios');
    ul.innerHTML = '';

    listaUsuarios.forEach((usuario, index) => {
        const textoUsuario = `${usuario.nome} ${usuario.email}`.toLowerCase();
        if (filtro && !textoUsuario.includes(filtro.toLowerCase())) {
            return;
        }

        const li = document.createElement('li');
        li.style.borderBottom = "1px solid #ccc";
        li.style.padding = "10px";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";

        // Conteúdo do item: Data, Nome, Email
        const infoSpan = document.createElement('span');
        infoSpan.textContent = `Data: ${usuario.data} | Nome: ${usuario.nome} | E-mail: ${usuario.email}`;

        // Botão de Excluir Item Individual
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = "Excluir";
        btnExcluir.style.marginLeft = "10px";
        btnExcluir.style.backgroundColor = "#ff4444";
        btnExcluir.style.color = "white";
        btnExcluir.onclick = () => excluirUsuario(index);

        li.appendChild(infoSpan);
        li.appendChild(btnExcluir);
        ul.appendChild(li);
    });
}

// 3. Função para Excluir UM item
function excluirUsuario(index) {
    const listaUsuarios = carregarDados();
    listaUsuarios.splice(index, 1);
    salvarDados(listaUsuarios);
    renderizarLista();
}

// 4. Função para Excluir TODOS os itens
function excluirTodos() {
    if(confirm("Tem certeza que deseja excluir todos os registros?")) {
        salvarDados([]);
        renderizarLista();
    }
}

// 5. Função para Pesquisar
function pesquisarUsuarios() {
    const termo = document.getElementById('pesquisa').value;
    renderizarLista(termo);
}

// 6. Função para Limpar Formulário
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    renderizarLista();
});