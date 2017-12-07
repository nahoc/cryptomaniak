function renderSettingsTab(exchangeRatesObject) {
  let exchangeRatesArray;
  let exchangeRatesSelect = '<div class="select"><select>';

  exchangeRatesArray = $.map(exchangeRatesObject, function (value, index) {
    return [index];
  });

  exchangeRatesArray.forEach(element => {
    exchangeRatesSelect += '<option>' + element + '</option>';
  });

  exchangeRatesSelect += '</select></div>';

  document.querySelector('#settingsTab').innerHTML +=
    '<li class="listItem">' +
    '<span class="settingName">Currency</span>' + exchangeRatesSelect;
  '</li>';
}

export { renderSettingsTab };