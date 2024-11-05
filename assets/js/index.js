let endpoint = "https://mindicador.cl/api/"
let myChart = null
document.getElementById("buscar").addEventListener("click", convert,);

selectMoney()

async function loadApi() {
  try {
    const res = await fetch(endpoint);
    const apiData = await res.json();
    return apiData;
  } catch (error) {
    console.log(error);
  }
}

async function selectMoney() {
  const apiData = await loadApi();
  
  Object.keys(apiData).forEach(function (moneda) {
    const object = apiData[moneda];
    console.log(object)
    if (typeof object === "object") {
      const keyoption = document.createElement("option");
      keyoption.innerHTML = `${moneda}`;
      document.getElementById("monedasDisponibles").appendChild(keyoption);
    }
  });
}

async function convert() {
  const apiData = await loadApi();
  const selectedMoney = document.getElementById("monedasDisponibles").value;
  const actualMoney = apiData[selectedMoney].valor;
  document.getElementById("vActual").innerHTML = actualMoney;

  const inputMoney = Number(document.getElementById("inputValor").value);
  const calculo =  (inputMoney / actualMoney);
  const calculoapp = Number(calculo.toPrecision(3))

  document.getElementById("resultado").innerHTML = `Moneda convertida: ${calculoapp}` ;

  renderGrafica(selectedMoney);
  return calculo;
}

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
      label: valor,
      borderColor: "rgb(106, 95, 250)",
      data,
    },
  ];

  return { labels, datasets };
}


async function renderGrafica(moneytype) {
  const data = await getMoneydata(moneytype);
  const config = {
    type: "line",
    data,
  };

  const canvasElement = document.getElementById("moneyChart");
  canvasElement.style.backgroundColor = "white";

  if (myChart !== null) {
    myChart.destroy();
  }


  myChart = new Chart(canvasElement, config);
}