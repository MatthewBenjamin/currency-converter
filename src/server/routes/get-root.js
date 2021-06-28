import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import App from '../../app/components/app';
import React from 'react';
const sheet = new ServerStyleSheet();

// sdkPromiseResult.then((res) => {
//   console.log('RES', res);
// });

// console.log({ fetchAssetsByType, fetchTickerForCurrency });

const createInitialHtmlString = (jsxString, styleTags) => `
<html>
  <head>
    <title>Uphold Frontend Assessment</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${styleTags}
  </head>
  <body>
    <div id="root">${jsxString}</div>
    <script src="./dist/index.js"></script>
  </body>
</html>
`;

const jsxString = renderToString(sheet.collectStyles(<App />));
const styleTags = sheet.getStyleTags();
const html = createInitialHtmlString(jsxString, styleTags);

export default (request, response, next) => {
  try {
    return response.send(html);
  } catch (error) {
    console.log('ERROR\n', error);

    return next(error);
  }
};
