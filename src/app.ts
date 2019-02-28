import express = require('express');
const bodyParser = require('body-parser');

import RegraController from './controllers/regra-controller';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);

app.get('/regras', RegraController.index);
app.post('/regras', RegraController.store);
app.delete('/regras', RegraController.delete);

export default app;

