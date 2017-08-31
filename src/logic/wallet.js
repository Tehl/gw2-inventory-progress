function buildWalletData(dataService) {
  return dataService.getWallet().then(res => {
    let wallet = {};
    let currencyIds = [];

    res.forEach(currency => {
      wallet[currency.id] = {
        id: currency.id,
        count: currency.value
      };
      currencyIds.push(currency.id);
    });

    return {
      wallet,
      currencyIds
    };
  });
}

export { buildWalletData };
