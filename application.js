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