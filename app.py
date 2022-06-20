from flask import Flask, render_template
import requests
import json
app = Flask(__name__)

# Fetching Data from API's
all_cryptos_url = "https://coinlore-cryptocurrency.p.rapidapi.com/api/tickers/"
querystring = {}
headers = {
	"X-RapidAPI-Key": "b4456bcfe4msh684da1f3b99b8cdp16d6c4jsnf86acff90432",
	"X-RapidAPI-Host": "coinlore-cryptocurrency.p.rapidapi.com"
}
all_cryptos = requests.request("GET", all_cryptos_url, headers=headers, params=querystring)

# Converting data in JSON format
jsonified_all_cryptos = json.loads(all_cryptos.text)
@app.route('/')
def hello_world():
    return render_template("home.html")

app.run(debug=True)