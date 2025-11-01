let input = document.querySelector("#input"); // O elemento input da mensagem do usuário
let botaoSend = document.querySelector("#send"); // O botão send que se refere ao input da mensagem do usuário
let divMensagens = document.querySelector("#mensagens"); // a div de mensagens onde aparece a troca de mensagens entre usuário e IA


// Essa função adiciona a caixa de texto a div de mensagens, usando dois parâmetros:
// texto (string) -> a mensagem enviada pelo usuário ou a resposta do chatBot
// tipo (string) -> o tipo pode ser "ia" ou "usuario", usando esse parâmetro, é definida a estilização da caixa de texto
function appendMessage(texto, tipo) {
  let div = document.createElement("div");
  let pDiv = document.createElement("p");
  
  pDiv.textContent = texto;
  div.classList.add(tipo === "usuario" ? "mensagem-usuario" : "mensagem-vit");
  if(texto.length > 400) {
    div.style.width = "40%";
  } 
  div.append(pDiv);
  let horario = document.createElement("small");
  horario.innerHTML = `<strong>${horarioAgora()}</strong>`;
  div.append(horario);
  divMensagens.append(div);

  divMensagens.scrollTop = divMensagens.scrollHeight;
}

// Recebe o valor do input (mensagem do usuário), e aciona a função appendMessage(), para adicionar sua mensagem ao chat, logo em seguida aciona a função respostaVit(), para receber uma resposta
async function envio() {
  if (input.value.trim()) {
    appendMessage(input.value, "usuario");
    const texto = input.value;
    input.value = "";
    respostaVit(texto);
  }
}

// Retorna uma string com o horário do momento do envio da mensagem
function horarioAgora() {
  let horario = new Date();
  let h = String(horario.getHours()).padStart(2, "0");
  let m = String(horario.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

// Faz uma requisição para a API do chatbot usando a pergunta do usuário
async function requisicaoVit(texto) {
  const url = "https://faq-ia.onrender.com/faq";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: texto }),
    });

    if (!res.ok) {
      throw new Error(`erro na requisição: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("falha ao buscar dados:", err);
    return { answer: "Erro ao buscar resposta" };
  }
}

// Executa a função requisiçãoVit(), e logo em seguida aciona a função appendMessage passando o parâmetro de tipo como "vit", se referindo a IA
async function respostaVit(texto) {
  let div = mostrarCarregamento();
  const res = await requisicaoVit(texto);
  appendMessage(res.answer || "Resposta indisponível", "vit");
}

function mostrarCarregamento() {
  let divCarregamento = document.createElement("div");
  let divP = document.createElement("p");
  divP.textContent = "Vit está digitando...";
  divCarregamento.classList = "carregamento";
  divCarregamento.append(divP)
  divMensagens.append(divCarregamento)
}

// Eventos de envio de mensagem
botaoSend.addEventListener("click", envio);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    envio();
  }
});
