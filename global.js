const nav = document.querySelector("nav");
let jsp = window.location.pathname; // pegar o caminho do arquivo para verificacao
jsp = jsp.substring(jsp.lastIndexOf("/") + 1); // selecionar com substring para apenas pegar o nome

nav.addEventListener("mouseover", () => {
    // se ja ta aberto, nao faz nada
    if (nav.classList.contains("open")) {
      return;
    } else {
      nav.classList.add("open");
    }
  setTimeout(() => {
    document.querySelectorAll("nav p").forEach((e) => {
      setTimeout(() => {
        e.style.display = "block";
      }, 150);
    });
  });
});

nav.addEventListener("mouseleave", () => {
  nav.classList.remove("open");
  setTimeout(() => {
    document
      .querySelectorAll("nav p")
      .forEach((e) => (e.style.display = "none"));
  });
});

const darkMode = document.querySelector(".dark-mode");
const lightMode = document.querySelector(".light-mode");
darkMode.addEventListener("click", () => {
  document.documentElement.classList.add("darkMode");
  darkMode.style.background = "rgba(176, 186, 195, 0.25)";
  lightMode.style.background = "none";
  jsp === "funcionario.jsp"
    ? document.querySelector(".topo").classList.add("dark")
    : null;
});

lightMode.addEventListener("click", () => {
  document.documentElement.classList.remove("darkMode");
  lightMode.style.background = "rgba(176, 186, 195, 0.25)";
  darkMode.style.background = "none";
  jsp === "funcionario.jsp"
    ? document.querySelector(".topo").classList.remove("dark")
    : null;
});
