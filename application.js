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