"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
exports.readFile = path => {
    fs.readFile(__dirname + path, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            const file = JSON.parse(data);
            file.regras.push(req.body);
            const json = JSON.stringify(file);
            res.send(json);
        }
    });
};
//# sourceMappingURL=readFile.js.map