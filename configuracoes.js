const botaoEditar = document.querySelector("#botao-editar");
const botaoCancelar = document.querySelector("#botao-cancelar");
const imgPreview = document.querySelector("#imgPreview");

let valoresIniciais = [];
let editando = false;

botaoEditar.addEventListener("click", () => {
  const inputs = document.querySelectorAll("input");

  // alterna o estado definido inicialmente como false
  editando = !editando;

  // altera o fundo do botão conforme o estado
  botaoEditar.style.background = editando
    ? "rgba(176, 186, 195, 0.25)"
    : "#ffffff00";

  if (editando) {
    // salva o estado inicial (incluindo o valor da senha, mas excluindo inputs de senha extra que ainda não existem)
    valoresIniciais = [imgPreview.src];
    inputs.forEach((e) => {
      // Não salvar inputs de senha extra e não salvar file inputs
      if (e.type !== "file" && e.id !== "inputSenhaAntiga" && e.id !== "inputSenhaNovaConfirmar") {
        valoresIniciais.push(e.value);
      }
    });

    // mostra os inputs de senha extra
    const senhasExtra = document.querySelector("#senhas-extra");
    if (senhasExtra) {
      senhasExtra.style.display = "flex";
      // Inicializa os botões de toggle senha quando os campos aparecem
      setTimeout(() => {
        inicializarToggleSenha();
      }, 0);
    }
    document.querySelector("label[for='inputFile']").style.display = "flex";

    // ativa inputs e seus respectivos estilos (exceto inputSenha por segurança)
    const inputSenha = document.querySelector("#inputSenha");
    inputs.forEach((e) => {
      // Mantém inputSenha desabilitado por segurança
      if (e.id === "inputSenha") {
        e.disabled = true;
        e.style.background = "transparent";
        e.style.paddingLeft = 0;
        return;
      }
      
      e.removeAttribute("disabled");
      getComputedStyle(document.documentElement).getPropertyValue(
        "--cor-fundo"
      ) === "#f0ece1"
        ? (e.style.background = "rgba(46, 46, 46, 0.1)")
        : (e.style.background = "rgba(240, 236, 225, 0.1)");
      e.style.paddingLeft = "0.5rem";
    });

    // Desabilita o botão de salvar durante a edição
    const botaoSalvar = document.querySelector("#botao-salvar");
    if (botaoSalvar) {
      botaoSalvar.disabled = true;
    }

    // focus no primeiro input de texto (que não seja inputSenha)
    const primeiroAtivo = [...inputs].find((e) => e.type !== "file" && e.id !== "inputSenha");
    if (primeiroAtivo) {
      primeiroAtivo.focus();
      const len = primeiroAtivo.value.length;
      primeiroAtivo.setSelectionRange(len, len);
    }
  } else {
    // Habilita o botão de salvar quando sair do modo de edição
    const botaoSalvar = document.querySelector("#botao-salvar");
    if (botaoSalvar) {
      botaoSalvar.disabled = false;
    }
    // oculta os inputs de senha extra
    const senhasExtra = document.querySelector("#senhas-extra");
    if (senhasExtra) {
      senhasExtra.style.display = "none";
      // limpa os valores dos inputs de senha extra
      const senhaAntiga = document.querySelector("#inputSenhaAntiga");
      const senhaNovaConfirmar = document.querySelector("#inputSenhaNovaConfirmar");
      if (senhaAntiga) senhaAntiga.value = "";
      if (senhaNovaConfirmar) senhaNovaConfirmar.value = "";
    }

    // desativa os inputs e restaura valores iniciais
    // Ordem dos valores: imgPreview[0], inputNome[1], inputEmail[2], inputSenha[3]
    let i = 1; // índice para valores iniciais (pulando imgPreview que está em [0])
    
    inputs.forEach((e) => {
      // Pular inputs de senha extra e file inputs
      if (e.id === "inputSenhaAntiga" || e.id === "inputSenhaNovaConfirmar" || e.type === "file") {
        return;
      }
      
      if (e.type !== "file") {
        e.value = valoresIniciais[i] || "";
        i++;
      }
      
      e.disabled = true;
      e.style.background = "transparent";
      e.style.paddingLeft = 0;
    });
    document.querySelector("label[for='inputFile']").style.display = "none";
  }
});

// CANCELAR
botaoCancelar.addEventListener("click", () => {
  if (!valoresIniciais.length) return;

  const inputs = document.querySelectorAll("input");
  imgPreview.src = valoresIniciais[0];

  // oculta os inputs de senha extra e limpa seus valores
  const senhasExtra = document.querySelector("#senhas-extra");
  if (senhasExtra) {
    senhasExtra.style.display = "none";
    const senhaAntiga = document.querySelector("#inputSenhaAntiga");
    const senhaNovaConfirmar = document.querySelector("#inputSenhaNovaConfirmar");
    if (senhaAntiga) {
      senhaAntiga.value = "";
      senhaAntiga.disabled = true;
      senhaAntiga.style.background = "transparent";
      senhaAntiga.style.paddingLeft = 0;
    }
    if (senhaNovaConfirmar) {
      senhaNovaConfirmar.value = "";
      senhaNovaConfirmar.disabled = true;
      senhaNovaConfirmar.style.background = "transparent";
      senhaNovaConfirmar.style.paddingLeft = 0;
    }
  }

  // Restaura valores iniciais (incluindo inputSenha)
  // Ordem dos valores: imgPreview[0], inputNome[1], inputEmail[2], inputSenha[3]
  let i = 1;
  inputs.forEach((e) => {
    if (e.type !== "file") {
      e.value = valoresIniciais[i] || "";
      i++;
    }
    e.disabled = true;
    e.style.background = "transparent";
    e.style.paddingLeft = 0;
  });

  // Habilita o botão de salvar ao cancelar
  const botaoSalvar = document.querySelector("#botao-salvar");
  if (botaoSalvar) {
    botaoSalvar.disabled = false;
  }

  botaoEditar.style.background = "transparent";
  editando = false;
});

// FUNCIONALIDADE DE MOSTRAR/OCULTAR SENHA
function inicializarToggleSenha() {
  document.querySelectorAll(".toggle-password").forEach((button) => {
    // Remove listeners anteriores se existirem
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    newButton.addEventListener("click", () => {
      const targetId = newButton.getAttribute("data-target");
      const input = document.querySelector(`#${targetId}`);
      const icon = newButton.querySelector("i");

      if (input) {
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("ri-eye-line");
          icon.classList.add("ri-eye-off-line");
        } else {
          input.type = "password";
          icon.classList.remove("ri-eye-off-line");
          icon.classList.add("ri-eye-line");
        }
      }
    });
  });
}

// Inicializar quando a página carregar
inicializarToggleSenha();

// MUDAR PREVIEW DA IMAGEM
function mudarPreview(inputId, imgId) {
  const input = document.querySelector(`#${inputId}`);
  const img = document.querySelector(`#${imgId}`);

  const arquivo = input.files[0];
  if (arquivo) {
    const url = URL.createObjectURL(arquivo);
    img.src = url;
  }
}

document
  .querySelector("#inputFile")
  .addEventListener("change", () => mudarPreview("inputFile", "imgPreview"));
