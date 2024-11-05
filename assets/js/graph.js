let endpoint = "https://mindicador.cl/api/"
let dolar = "dolar"
let euro = "euro"
let uf = "uf"

async function getMoneydata(valor) {
  const endpointfinal = endpoint + valor
  const res = await fetch(endpointfinal);
  const dolarValues = await res.json();
  const lastedValues = dolarValues.serie.slice(0, 10);

  const labels = lastedValues.map((dias) => {
    return dias.fecha;
  });

  const data = lastedValues.map((dias) => {
    const valor = dias.valor;
    return Number(valor);
  });

  const datasets = [
    {
      label: "Valor",
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];

  return { labels, datasets };
}

let myChart = null;

async function renderGrafica() {
  const data = await getMoneydata(uf);
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("moneyChart");
  moneyChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}
renderGrafica();
