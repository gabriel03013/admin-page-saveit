const API_URL = "https://faq-ia.onrender.com/faq";
const chatBox = document.getElementById("chat-box" );
const inputMessage = document.getElementById("input-message");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", sendMessage);
inputMessage.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function appendMessage(sender, text) {
    const messageElement = document.createElement("div");
    
    // Adiciona a classe 'message' e as classes do remetente
    messageElement.classList.add("message");
    sender.split(' ').forEach(cls => messageElement.classList.add(cls));
    
    // Formata o texto para quebras de linha
    const formattedText = text.replace(/\n/g, "  ");
    
    messageElement.innerHTML = `<p>${formattedText}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rola para a mensagem mais recente
    
    return messageElement;
}

async function sendMessage() {
    const question = inputMessage.value.trim();
    if (question === "") return;

    // 1. Exibe a mensagem do usuário
    appendMessage("user", question);
    inputMessage.value = "";
    sendButton.disabled = true;
    
    // 2. Exibe uma mensagem de carregamento
    const loadingId = "loading-" + Date.now();
    const loadingElement = appendMessage("ai loading", "Digitando...");
    loadingElement.id = loadingId;


    try {
        // 3. Chama a API
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question: question }),
        });

        // 4. Remove a mensagem de carregamento
        loadingElement.remove();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        const answer = data.answer || "Desculpe, não recebi uma resposta válida da IA.";

        // 5. Exibe a resposta da IA
        appendMessage("ai", answer);

    } catch (error) {
        console.error("Erro na comunicação com a API:", error);
        // Remove a mensagem de carregamento em caso de erro
        loadingElement.remove();
        
        // Verifica se o erro é de CORS (muito comum em testes locais)
        const errorMessage = error.message.includes("Failed to fetch") 
            ? `Erro de Conexão (CORS/Rede). Tente hospedar o frontend em um domínio real. Detalhes: ${error.message}`
            : `Erro ao conectar: ${error.message}.`;
            
        appendMessage("ai error", errorMessage);
    } finally {
        sendButton.disabled = false;
    }
}

// Mensagem de boas-vindas inicial
appendMessage("ai", "Olá! Eu sou o assistente de FAQ do SaveIt. Pergunte-me sobre o sistema!");
