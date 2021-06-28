import { fetchAssetsByType } from '../uphold-sdk';

export default async (request, response, next) => {
  try {
    const assets = await fetchAssetsByType();

    return response.json(assets);
  } catch (error) {
    console.log('ERROR\n', error);

    return next(error);
  }
};
