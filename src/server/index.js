import express from 'express';

import getAssets from './routes/get-assets';
import getRoot from './routes/get-root';
import getTicker from './routes/get-ticker';

const PORT = 8080;

console.log('Starting Server...');

const app = express();

app.disable('x-powered-by');

app.use('/dist', express.static('dist'));

app.use('/assets', getAssets);
app.use('/ticker', getTicker);
app.use('/', getRoot);

console.log(`Listening on: http://localhost:${PORT}`);
app.listen(PORT);
