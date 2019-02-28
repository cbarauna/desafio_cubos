"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require('body-parser');
const regra_controller_1 = require("./controllers/regra-controller");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.get('/regras', regra_controller_1.default.index);
app.post('/regras', regra_controller_1.default.store);
app.delete('/regras', regra_controller_1.default.delete);
exports.default = app;
//# sourceMappingURL=app.js.map