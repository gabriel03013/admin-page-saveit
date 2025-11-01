const fetchData = async () => {
  const url = "http://localhost:8000/user/6";
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Falha ao buscar dados:", err);
    return { name: "Erro ao buscar resposta" };
  }
};

console.log(await fetchData())
