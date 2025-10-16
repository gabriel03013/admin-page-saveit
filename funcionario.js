const documentStyle = document.documentElement.style;

const statusFuncionarios = document.querySelectorAll(".funcionario-status");
console.log();
statusFuncionarios.forEach((status) => {
  if (status.textContent === "Ativo") {
    status.style.color = "#6b8e4e";
  } else {
    status.style.color = "red";
  }
});

let funcionariosAtivos = 0;
statusFuncionarios.forEach((funcionario) => {
  if (funcionario.textContent === "Ativo") {
    funcionariosAtivos++;
  }
});

document.querySelector("#quantidade-funcionarios").textContent =
  funcionariosAtivos;

// MANIPULACAO DOS FORMULARIOS
const main = document.querySelector("main");
const formAdicionarFuncionario = document.querySelector(
  ".adicionar-funcionario"
);

document
  .querySelector("#botao-adicionar-funcionario")
  .addEventListener("click", () => {
    formAdicionarFuncionario.style.display = "block";
    // document.body.
  });

document.querySelectorAll(".fechar-adicionar-funcionario").forEach((e) =>
  e.addEventListener("click", () => {
    formAdicionarFuncionario.style.display = "none";
  })
);

document.querySelectorAll("tr").forEach((e) =>
  e.addEventListener("click", () => {
    document.querySelector(".editar-funcionario").style.display = "block";
  })
);

document.querySelectorAll(".fechar-editar-funcionario").forEach((e) =>
  e.addEventListener("click", () => {
    document.querySelector(".editar-funcionario").style.display = "none";
  })
);

document.querySelectorAll(".botao-deletar-funcionario").forEach((e) =>
  e.addEventListener("click", () => {
    document.querySelector(".deletar-funcionario").style.display = "flex";
  })
);

document
  .querySelector(".fechar-deletar-funcionario")
  .addEventListener("click", () => {
    document.querySelector(".deletar-funcionario").style.display = "none";
  });
  
document.querySelectorAll(".botao-deletar-funcionario").forEach((botao) => {
  botao.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

function mudarPreview(inputId, imgId) {
  const input = document.querySelector(`#${inputId}`);
  const img = document.querySelector(`#${imgId}`);

  const arquivo = input.files[0];
  if (arquivo) {
    const url = URL.createObjectURL(arquivo);
    img.src = url;
  }
}

const input = document.querySelector("#inputFile");
input.addEventListener("change", () => mudarPreview("inputFile", "preview"));

const input2 = document.querySelector("#inputFile2");
input2.addEventListener("change", () => mudarPreview("inputFile2", "preview2"));
