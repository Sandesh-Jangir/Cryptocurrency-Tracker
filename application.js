// Fetching the data from api
const getData = async ()=>{
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'd4bff30808msh630f9ab744e4437p129b24jsnd4d03d73b810',
          'X-RapidAPI-Host': 'coinlore-cryptocurrency.p.rapidapi.com'
        }
      };
      
      let data = await fetch('https://coinlore-cryptocurrency.p.rapidapi.com/api/tickers/?start=0&limit=100', options)
      let jsonifiedData = await data.json();

      return jsonifiedData;
}

// Filtering the data for the featuring list
const getFeaturing = async ()=>{
  let data = await getData();
    let currencies = Object.entries(data)[0][1];
    let currencyTrends = [] // All changes in past 24hour
    for(const currency in currencies){
      currencyTrends.push(Number(currencies[currency]['percent_change_24h']));
    }
    currencyTrends.sort();
    let trending = currencyTrends.slice(-4); // Getting the top 4 trending currencies' percent change.
    let featuringCurrencies = [];

    // Filtering the data of top trending currencies and adding in the featuringCurrencies[]
    for (let i = 0; i < trending.length; i++) {
      for (let k = 0; k < currencies.length; k++) {
        const element = currencies[k];
        if(element['percent_change_24h'] == trending[i]){
          featuringCurrencies.push(element)
        }
      }
    }
    
    return (featuringCurrencies);
  }

// Updating the featuring list in the DOM
const updateFeaturing = ()=>{
  getFeaturing().then((featuringCurrencies) => {
    for(id in featuringCurrencies.reverse()){
      document.getElementById('featuring').innerHTML += `
      <div class="card">
      <div class="heading">${featuringCurrencies[id]['name']}</div>
      <div class="cur-prc">$${parseFloat(featuringCurrencies[id]['price_usd']).toFixed(2)}<div class="prc-chng-amnt">+$${(featuringCurrencies[id]['percent_change_24h']*featuringCurrencies[id]['price_usd']/100).toFixed(2)}</div></div>
      <div class="prc-chng">+${parseFloat(featuringCurrencies[id]['percent_change_24h']).toFixed(2)}% <img src="./resources/uptrend.svg"></div>
      </div>
      `
    }
  })
}

updateFeaturing();