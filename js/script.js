const {
  ipcRenderer,
  shell
} = require('electron');

// Navigation
$('.tabButton').click(function () {
  $('.tabButton').removeClass('tabButtonActive');
  $(this).addClass('tabButtonActive');

  $('.tab').hide();

  if (this.id === "marketTabButton") {
    $('#marketTab').show();
    $('#balance').toggleClass('closed');
  }
  if (this.id === "portfolioTabButton") {
    $('#portfolioTab').show();
    $('#balance').removeClass('closed');
  }
});

const isNegative = (value) => {
  if (value.indexOf('-') !== -1) {
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
    const coinSymbol = element.symbol;
    const coinPriceChange = element.percent_change_24h;

    document.querySelector('#marketTabCoins').innerHTML +=
      '<li class="listItem">' +
      '<img src="assets/coins/' + coinSymbol + '.svg" width="24" height="24" />' +
      '<span class="coinName">' + coinName + '</span>' +
      '<span class="coinPrice">$' + formatPrice(coinPrice) +
      '<br/><span class="coinPriceChange ' + isNegative(coinPriceChange) + '">' + coinPriceChange + '%</span></span>' +
      '</li>';

    document.querySelector('#portfolioTabCoins').innerHTML +=
      '<li class="listItem">' +
      '<img src="assets/coins/' + coinSymbol + '.svg" width="24" height="24" />' +
      '<span class="coinName">' + coinName + '</span>' +
      '<input type="text" class="coinQuantity">' +
      '</li>';
  });
}

const getMarketTabCoins = () => {
  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';

  fetch(url)
    .then(
      function (response) {
        response.json().then(function (data) {
          updateView(data);
        });
      }
    )
    .catch(function (err) {
      // error
    });
}

// Update initial market coins when loaded
document.addEventListener('DOMContentLoaded', getMarketTabCoins);