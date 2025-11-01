// Removido código das categorias em modal

// botaos e/do forms
const btnEditar = document.querySelector("#btnEditar");
const btnCancelar = document.querySelector("#btnCancelar");
const btnSalvar = document.querySelector("#btnSalvar");
const form = document.querySelector("form");

// obter inputs, select e radio buttons do forms
function obterElementosFormulario() {
    return {
        todosInputs: document.querySelectorAll("input[type='text'], input[type='tel']"),
        selectEstado: document.querySelector("#selectEstado"),
        inputImg: document.querySelector("#inputImg"),
        radiosCategorias: document.querySelectorAll("input[type='radio'][name='categoria-radio']")
    };
}

// variavel pra verificar se esta em edicao ou nao
let emModoEdicao = false;
let valoresOriginais = {};

// pega os valores originais
function salvarValoresOriginais() {
    const elementos = obterElementosFormulario();
    valoresOriginais = {};
    
    elementos.todosInputs.forEach(input => {
        valoresOriginais[input.id] = input.value;
    });
    
    valoresOriginais[elementos.selectEstado.id] = elementos.selectEstado.value;
    
    // Salvar radio button selecionado
    elementos.radiosCategorias.forEach(radio => {
        if (radio.checked) {
            valoresOriginais.categoriaRadio = radio.value;
        }
    });
    // Se nenhum estava selecionado, salvar null
    if (!valoresOriginais.categoriaRadio) {
        valoresOriginais.categoriaRadio = null;
    }
    
    // Para o file input, apenas marcar se tinha arquivo
    // Não podemos salvar o arquivo em si por segurança
    valoresOriginais[elementos.inputImg.id] = elementos.inputImg.files && elementos.inputImg.files.length > 0;
}

// restaura os valores originais no click do botao cancelar
function restaurarValoresOriginais() {
    const elementos = obterElementosFormulario();
    
    elementos.todosInputs.forEach(input => {
        if (valoresOriginais[input.id] !== undefined) {
            input.value = valoresOriginais[input.id];
        }
    });
    
    if (valoresOriginais[elementos.selectEstado.id] !== undefined) {
        elementos.selectEstado.value = valoresOriginais[elementos.selectEstado.id];
    }
    
    // Restaurar radio button
    if (valoresOriginais.categoriaRadio !== undefined) {
        elementos.radiosCategorias.forEach(radio => {
            radio.checked = radio.value === valoresOriginais.categoriaRadio;
        });
    }
    
    // Para o file input, resetar o valor (não é possível restaurar o arquivo por segurança)
    if (elementos.inputImg.files && elementos.inputImg.files.length > 0) {
        elementos.inputImg.value = '';
    }
}

// Função para habilitar todos os campos
function habilitarCampos() {
    const elementos = obterElementosFormulario();
    
    elementos.todosInputs.forEach(input => {
        input.disabled = false;
    });
    elementos.selectEstado.disabled = false;
    elementos.inputImg.disabled = false;
    elementos.radiosCategorias.forEach(radio => {
        radio.disabled = false;
    });
    btnSalvar.disabled = true; // Submit desabilitado enquanto está editando
    emModoEdicao = true;
    
    // Focar no primeiro input (Nome do Negócio)
    const primeiroInput = document.querySelector("#inputNome");
    if (primeiroInput) {
        setTimeout(() => {
            primeiroInput.focus();
        }, 100);
    }
}

// Função para desabilitar todos os campos
function desabilitarCampos() {
    const elementos = obterElementosFormulario();
    
    elementos.todosInputs.forEach(input => {
        input.disabled = true;
    });
    elementos.selectEstado.disabled = true;
    elementos.inputImg.disabled = true;
    elementos.radiosCategorias.forEach(radio => {
        radio.disabled = true;
    });
    btnSalvar.disabled = true; // Submit permanece desabilitado
    emModoEdicao = false;
}

// Evento de clique no botão Editar (toggle entre modo edição e visualização)
btnEditar.addEventListener("click", () => {
    if (emModoEdicao) {
        // Sair do modo de edição
        desabilitarCampos();
    } else {
        // Entrar no modo de edição
        salvarValoresOriginais();
        habilitarCampos();
    }
});

// Evento de clique no botão Cancelar
btnCancelar.addEventListener("click", () => {
    if (emModoEdicao) {
        // Restaurar valores originais
        restaurarValoresOriginais();
        // Sair do modo de edição
        desabilitarCampos();
    }
});

// Evento de submit do formulário - após salvar, desabilitar campos novamente
form.addEventListener("submit", (e) => {
    // Após o submit (assumindo sucesso), desabilitar os campos
    // Nota: Em um ambiente real, você pode querer fazer isso após uma confirmação do servidor
    setTimeout(() => {
        desabilitarCampos();
        // Atualizar os valores originais para os novos valores salvos
        salvarValoresOriginais();
    }, 100);
});