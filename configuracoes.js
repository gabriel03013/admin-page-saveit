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
    ? "rgba(176, 186, 195, 0.25)" :
    "#ffffff00";

  if (editando) {
    // salva o estado inicial
    valoresIniciais = [imgPreview.src];
    inputs.forEach((e) => {
      if (e.type !== "file") valoresIniciais.push(e.value);
    });

    // ativa inputs e seus respectivos estilos
    inputs.forEach((e) => {
      e.removeAttribute("disabled");
      getComputedStyle(document.documentElement).getPropertyValue("--cor-fundo") === "#f0ece1" ? e.style.background = "rgba(46, 46, 46, 0.1)" : e.style.background = "rgba(240, 236, 225, 0.1)"
      e.style.paddingLeft = "0.5rem";
    });

    // focus no primeiro input de texto
    const primeiroAtivo = [...inputs].find((e) => e.type !== "file");
    if (primeiroAtivo) {
      primeiroAtivo.focus();
      const len = primeiroAtivo.value.length;
      primeiroAtivo.setSelectionRange(len, len);
    }
  } else {
    // desativa os inputs
    inputs.forEach((e) => {
      e.disabled = true;
      e.style.background = "transparent";
      e.style.paddingLeft = 0;
    });
  }
});

// CANCELAR
botaoCancelar.addEventListener("click", () => {
  if (!valoresIniciais.length) return;

  const inputs = document.querySelectorAll("input");
  imgPreview.src = valoresIniciais[0];

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

  botaoEditar.style.background = "transparent";
  editando = false;
});

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
