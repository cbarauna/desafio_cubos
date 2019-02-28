"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class HorarioController {
    index(req, res) {
        fs.readFile(__dirname + '/../../src/database.json', 'utf8', function (err, data) {
            if (err) {
                return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
            }
            res.send('index de horarios');
        });
    }
}
exports.default = new HorarioController();
//# sourceMappingURL=horario-controller.js.map