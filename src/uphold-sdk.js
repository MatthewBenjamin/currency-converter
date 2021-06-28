import { CRYPTO_TYPE, FIAT_TYPE } from './constants';
import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
  baseUrl: 'http://api-sandbox.uphold.com',
  clientId: 'foo',
  clientSecret: 'bar',
});

export const fetchTickerForCurrency = (currency) => sdk.getTicker(currency);

const CURRENCY_TYPES_USED = [CRYPTO_TYPE, FIAT_TYPE];

const mapAssetsToType = (assets) =>
  assets.reduce((acc, current) => {
    const { code, type } = current;

    if (CURRENCY_TYPES_USED.includes(type)) {
      acc[code] = current;
    }

    return acc;
  }, {});

export const fetchAssetsByType = () => sdk.api('assets', { authenticate: false }).then(mapAssetsToType);
