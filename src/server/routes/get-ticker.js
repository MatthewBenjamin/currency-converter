import { fetchTickerForCurrency } from '../uphold-sdk';

export default async (request, response, next) => {
  try {
    const ticker = await fetchTickerForCurrency(request.query.ticker);

    return response.json(ticker);
  } catch (error) {
    console.log('ERROR\n', error);

    return next(error);
  }
};
