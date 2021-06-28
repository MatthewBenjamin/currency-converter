# currency-converter

## Running the app
1. Clone the repo
2. Checkout `master` branch
3. Node 14 recommended
4. `npm i` // or `npm ci`
5. `npm run dev` Runs the app in the development mode.
6. Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## High Level
- This app performs conversion calculations for **all** fiat and cryptocurrencies, as returned from the https://api.uphold.com/v0/assets endpoint
- On page load, a one time request to the /assets endpoint is made to fetch an up to date list of assets
- The user can select any fiat or cryptocurrency as the source currency. Once the user enters an amount for the source currency, the equivalent amount is displayed for all trading pairs. The ask price is used under the assumption that the source currency is what would be converted.
- Ticker prices are only fetched when the source currency is changed
- Linting with eslint-config-uphold-react
- API calls made through a node api layer with @uphold/uphold-sdk-javascript
- Full stack express / react app. Built with parcel but could be optmized. See Future Enhancements section below for comments

## Future Enhancements
- UI Design
	- The assignment mockups were for a smaller number of assets, however the design could be rethought (perhaps a multi column layout or some interactive selection) to better display such a large number of assets.
- Performance
	- Optimize server-side rending
		- Initial data (i.e. assets and the ticker prices for USD) - can be preloaded on the server. Since it's the same data for all users, fetching data for SSR will be non blocking. Individual users will only need to fetch new prices when they update the source currency.
	- Optimize build size
		- move images to CDN / static assets (instead of inline SVG in the JS code)
		- lazy load components and other JS that's needed initally
	- Optimize frontend runtime
		- explore reducing needless re-renders
	- Cache API requests more aggressively
		- for example: utilize localStorage or cache headers on the frontend to prevent calling same ticker prices twice
		- redis cache on backend
- Tests are needed
	- unit tests
	- end-to-end tests with Cypress
- Component library
	- components could be refactored to better reflect Uphold's design system. I.e. add design tokens to theme provider, etc.
- Add proper logging, analytics, error handling
