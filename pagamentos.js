document.querySelectorAll(".status-pagamento").forEach(e => {
    if(e.textContent === "Pendente") {
        e.style.color = "#E63C22";
    } else {
        e.style.color = "#6B8E4E";
    }
})