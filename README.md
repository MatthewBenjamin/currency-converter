# [u-currency-converter](https://u-currency-converter-deploy.vercel.app/)

https://u-currency-converter-deploy.vercel.app/

`yarn start`
Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## High Level
- This app performs conversion calculations for **all** fiat and cryptocurrencies, as returned from the https://api.uphold.com/v0/assets endpoint
- On page load, a one time request to the /assets endpoint is made to fetch an up to date list of assets
- The user can select any fiat or cryptocurrency as the source currency. Once the user enters an amount for the source currency, the equivalent amount is displayed for all trading pairs. The ask price is used under the assumption that the source currency is what would be converted.
- Ticker prices are only fetched when the source currency is changed
- Linting with eslint-config-uphold-react
- API calls made with @uphold/uphold-sdk-javascript
- Bootstrapped from create-react-app: See Future Enhancements section below for comments

## Future Enhancements
- Add a Node server (perhaps with Next.js) for the following benefits:
	- server-side rending
	- Initial data (i.e. assets and the ticker prices for USD) - can be preloaded on the server. Since it's the same data for all users, fetching data for SSR will be non blocking. Individual users will only need to fetch new prices when they update the source currency.
- Tests are needed
	- unit tests
	- end-to-end tests with Cypress
- Component library
	- components could be refactored to be better reflect Uphold's design system. I.e. add design tokens to theme provider, etc.