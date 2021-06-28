import { CRYPTO_TYPE, FIAT_TYPE } from '../app/constants';
import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
  baseUrl: 'https://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
});

export const fetchTickerForCurrency = (currency) => sdk.getTicker(currency);

const CURRENCY_TYPES_USED = new Set([CRYPTO_TYPE, FIAT_TYPE]);

const mapAssetsToType = (assets) =>
  assets.reduce((accumulator, current) => {
    const { code, type } = current;

    if (CURRENCY_TYPES_USED.has(type)) {
      accumulator[code] = current;
    }

    return accumulator;
  }, {});

export const fetchAssetsByType = () =>
  sdk
    .api('assets', { authenticate: false })
    .then(mapAssetsToType)
    .catch((error) => {
      console.log('err', error);

      return error;
    });
