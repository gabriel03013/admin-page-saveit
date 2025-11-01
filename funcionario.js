const documentStyle = document.documentElement.style;
// MANIPULACAO DOS FORMULARIOS
const main = document.querySelector("main");
const formAdicionarFuncionario = document.querySelector(
  ".adicionar-funcionario"
);

document
  .querySelector("#botao-adicionar-funcionario")
  .addEventListener("click", () => {
    formAdicionarFuncionario.style.display = "block";
  });

document.querySelectorAll(".fechar-adicionar-funcionario").forEach((e) =>
  e.addEventListener("click", () => {
    formAdicionarFuncionario.style.display = "none";
  })
);

// editar funcionario
document.querySelectorAll("tbody tr").forEach(row => {
  row.addEventListener("click", (e) => {
    if (e.target.closest('.botao-deletar-funcionario')) {
      return;
    }
    
    const funcionarioData = JSON.parse(row.getAttribute('data-funcionario'));
    
    // preenche o form com os dados para edicao
    document.querySelector("#inputNome2").value = funcionarioData.nome;
    document.querySelector("#inputCargo2").value = funcionarioData.cargo;
    
    document.querySelector("#inputEmail2").value = funcionarioData.email || "";
    document.querySelector("#inputTel2").value = funcionarioData.telefone || "";
    
    document.querySelector(".editar-funcionario").style.display = "block";
  });
});

document.querySelectorAll(".fechar-editar-funcionario").forEach((e) =>
  e.addEventListener("click", () => {
    document.querySelector(".editar-funcionario").style.display = "none";
  })
);

document.querySelectorAll(".botao-deletar-funcionario").forEach((botao) => {
  botao.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelector(".deletar-funcionario").style.display = "flex";
  });
});

document
  .querySelector(".fechar-deletar-funcionario")
  .addEventListener("click", () => {
    document.querySelector(".deletar-funcionario").style.display = "none";
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