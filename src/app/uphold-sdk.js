// eslint-disable-next-line no-undef
const makeFetch = (url) => fetch(url).then((response) => response.json());

export const fetchAssetsByType = () => makeFetch('/assets');
export const fetchTickerForCurrency = (currency) => makeFetch(`/ticker?ticker=${currency}`);
