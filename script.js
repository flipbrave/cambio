

const moedaOrigemSelect = document.getElementById("moedaOrigem");
const valorInput = document.getElementById("valor");
const cotacaoResultado = document.getElementById("cotacao-resultado");

moedaOrigemSelect.addEventListener("change", () => {
    atualizarCotacao();
});

valorInput.addEventListener("input", () => {
    atualizarCotacao();
});

async function atualizarCotacao() {
    const moedaOrigem = moedaOrigemSelect.value;
    const valor = valorInput.value;

    if (!valor || isNaN(valor)) {
        cotacaoResultado.textContent = 'Por favor, insira um valor para a conversão';
        return;
    }

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${moedaOrigem}-BRL`);
        const data = await response.json();
        const cotacao = formatarBRL(data[`${moedaOrigem}BRL`].bid * valor);
        cotacaoResultado.textContent = `${cotacao}`;
    } catch (error) {
        console.error('Erro ao obter cotação:', error);
        cotacaoResultado.textContent = 'Erro ao obter cotação. Tente novamente mais tarde.';
    }
}

function formatarBRL(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

atualizarCotacao();
