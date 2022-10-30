// Fetching the data from api
const getData = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d4bff30808msh630f9ab744e4437p129b24jsnd4d03d73b810",
      "X-RapidAPI-Host": "coinlore-cryptocurrency.p.rapidapi.com",
    },
  };

  let data = await fetch(
    "https://coinlore-cryptocurrency.p.rapidapi.com/api/tickers/?start=0&limit=100",
    options
  );
  let jsonifiedData = await data.json();

  return jsonifiedData;
};

// Filtering the data for the featuring list
const getFeaturing = async () => {
  let data = await getData();
  let currencies = Object.entries(data)[0][1];
  let currencyTrends = []; // All changes in past 24hour
  for (const currency in currencies) {
    currencyTrends.push(Number(currencies[currency]["percent_change_24h"]));
  }
  currencyTrends.sort();
  let trending = currencyTrends.slice(-4); // Getting the top 4 trending currencies' percent change.
  let featuringCurrencies = [];

  // Filtering the data of top trending currencies and adding in the featuringCurrencies[]
  for (let i = 0; i < trending.length; i++) {
    for (let k = 0; k < currencies.length; k++) {
      const element = currencies[k];
      if (element["percent_change_24h"] == trending[i]) {
        featuringCurrencies.push(element);
      }
    }
  }

  return featuringCurrencies;
};

// Updating the featuring list in the DOM
const updateFeaturing = () => {
  getFeaturing().then((featuringCurrencies) => {
    for (id in featuringCurrencies.reverse()) {
      let assetName = featuringCurrencies[id]["nameid"];
      document.getElementById("featuring").innerHTML += `
      <a href="#" onclick="event.stopPropagation(); toAnalytics('${assetName}');" class="card">
      <div class="heading">${featuringCurrencies[id]["name"]}</div>
      <div class="cur-prc">$${parseFloat(
        featuringCurrencies[id]["price_usd"]
      ).toFixed(2)}<div class="prc-chng-amnt">+$${(
        (featuringCurrencies[id]["percent_change_24h"] *
          featuringCurrencies[id]["price_usd"]) /
        100
      ).toFixed(2)}</div></div>
      <div class="prc-chng">+${parseFloat(
        featuringCurrencies[id]["percent_change_24h"]
      ).toFixed(2)}% <img src="./resources/uptrend.svg"></div>
      </a>
      `;
    }
  });
};

// Function to navigate toward the analytics section
const toAnalytics = (name) => {
  let container = document.getElementById("analytics");
  container.style.transform = "translateX(0%)";

  getData().then((jsonifiedData) => {
    let dataArray = Object.entries(jsonifiedData);
    let assetArray = dataArray[0][1];
    for (asset in assetArray) {
      if (assetArray[asset]["nameid"] == name) {
        //Adding dynamic values to the analytics page.
        document.getElementById("cr-name").innerText =
          assetArray[asset]["name"];
        document.getElementById(
          "cr-price"
        ).innerText = `$${assetArray[asset]["price_usd"]}`;

        // Uptrend and Downtrend values.

        // percent_change_24h
        if (assetArray[asset]["percent_change_24h"] > 0) {
          document.getElementById(
            "th"
          ).innerHTML = `Today : <span style="color:green;" > ${assetArray[asset]["percent_change_24h"]}% <img src="./resources/uptrend.svg"></span>`;
        } else {
          document.getElementById(
            "th"
          ).innerHTML = `Today : <span style="color:red;" > ${assetArray[asset]["percent_change_24h"]}% <img class="downtrend" src="./resources/downtrend.svg"></span>`;
        }

        // percent_change_1h
        if (assetArray[asset]["percent_change_1h"] > 0) {
          document.getElementById(
            "t"
          ).innerHTML = `This Hour : <span style="color:green;" > ${assetArray[asset]["percent_change_1h"]}% <img src="./resources/uptrend.svg"></span>`;
        } else {
          document.getElementById(
            "t"
          ).innerHTML = `This Hour : <span style="color:red;" > ${assetArray[asset]["percent_change_1h"]}% <img class="downtrend" src="./resources/downtrend.svg"></span>`;
        }

        // percent_change_7d
        if (assetArray[asset]["percent_change_7d"] > 0) {
          document.getElementById(
            "tw"
          ).innerHTML = `This Week : <span style="color:green;" > ${assetArray[asset]["percent_change_7d"]}% <img src="./resources/uptrend.svg"></span>`;
        } else {
          document.getElementById(
            "tw"
          ).innerHTML = `This Week : <span style="color:red;" > ${assetArray[asset]["percent_change_7d"]}% <img class="downtrend" src="./resources/downtrend.svg"></span>`;
        }

        // Updating Asset Info
        document.getElementById("mc").innerHTML = `Market Capitalisation : <span>${assetArray[asset]["market_cap_usd"]}</span>`
        document.getElementById("cs").innerHTML = `Circulating Supply : <span>${assetArray[asset]["csupply"]}</span>`
        document.getElementById("hv").innerHTML = `24-Hours Volume : <span>${assetArray[asset]["volume24"]}</span>`
      }
    }
  });
};

// Serching the cryptocurrency
const searchAsset = ()=>{
  let searchedTerm = document.getElementById("input").value;
  if (searchedTerm != ""){
    toAnalytics(searchedTerm.toLowerCase());
  }
  document.getElementById("input").value = "";
}

const backToHome = ()=>{
  document.getElementById('analytics').style.transform = "translateX(100%)";
}
updateFeaturing();
