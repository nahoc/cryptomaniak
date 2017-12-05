const {
  ipcRenderer,
  shell
} = require('electron');
const nodeConsole = require('console');
let myConsole = new nodeConsole.Console(process.stdout, process.stderr);

const isNegative = (value) => {
  if(value.indexOf('-') !== -1) {
    return "coinPriceChangeNegative";
  }
}

const formatPrice = (price) => {
  return price.replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

const updateView = (marketTabCoins) => {

  marketTabCoins.forEach(element => {
    const coinName = element.name;
    const coinPrice = element.price_usd;
    const coinPriceChange = element.percent_change_24h;

    document.querySelector('#marketTabCoins').innerHTML += 
      '<li class="listItem">' +
        '<img src="" width="16" height="16">' +
          '<span class="coinName">' + coinName + '</span>' +
          '<span class="coinPrice">$' + formatPrice(coinPrice) + 
          '<br/><span class="coinPriceChange ' + isNegative(coinPriceChange) + '">' + coinPriceChange + '%</span></span>' +
      '</li>';
  });
}

const getMarketTabCoins = () => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';

  fetch(url)
    .then(
      function (response) {
        if (response.status !== 200) {
          myConsole.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then(function (data) {
          updateView(data);
        });
      }
    )
    .catch(function (err) {
      myConsole.log('Fetch Error :-S', err);
    });
}

// Update initial market coins when loaded
document.addEventListener('DOMContentLoaded', getMarketTabCoins);