import { Request, Response } from 'express';
const fs = require('fs');

import * as util from '../util';

class RegraController {
  public index(req: Request, res: Response) {

    let query = req.query;

    fs.readFile(__dirname + '/../../src/database.json', 'utf8', (err: any, data: any) => {
      if (err) {
        return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
      }

      if (Object.keys(query).length !== 0) {
        let json = JSON.parse(data);

        if (json.regras.length == 0) {
          return res.send(json);
        }

        var result = <any>[];

        for (let i = 0; i < json.regras.length; i++) {
          let row = json.regras[i];
          if (row.daily) {
            result.push(row);
            continue;
          }

          let dateStart = query.start.split("-");
          let dateEnd = query.end.split("-");

          let data1 = new Date(dateStart[2], dateStart[1] - 1, dateStart[0]);
          let data2 = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0]);

          //se for uma regra semanal, pega os dias da semana informado no filtro e busca somente as regras que batem com esse range.
          if (row.weekly) {
            let daysWeek = [
              { number: 0, day: 'sunday' },
              { number: 1, day: 'monday' },
              { number: 2, day: 'tuesday' },
              { number: 3, day: 'wednesday' },
              { number: 4, day: 'thursday' },
              { number: 5, day: 'friday' },
              { number: 6, day: 'saturday' }];

            if (data1.getDay() != data2.getDay()) {
              daysWeek = daysWeek.filter(item => {
                if (item.number >= data1.getDay() && item.number <= data2.getDay()) {
                  return item;
                }
              });

              let controleWeek = false;

              for (let i = 0; i < daysWeek.length; i++) {
                controleWeek = util.findWeek(row, daysWeek[i].day);

                if (!controleWeek) {
                  break;
                }
              }

              if (controleWeek) {
                result.push(row);
              }
            } else {
              //As datas informadas pegam uma semana inteira, então pode inserir.
              result.push(row);
            }

            continue;
          }

          let dateRow = row.day.split("-");
          let dataAcomparar = new Date(dateRow[2], dateRow[1] - 1, dateRow[0]);

          if (data2 >= dataAcomparar && data1 <= dataAcomparar) {
            result.push(row);
          }
        }

        return res.send({ regras: result });
      }

      let json = JSON.parse(data);
      res.send(json);
    });
  }

  public store(req: Request, res: Response) {
    let body = req.body;

    if (body.daily && body.weekly) {
      return res.status(400).json({ msg: 'Regra inválida. Não pode ter uma regra que é diariamente e semanalmente ao mesmo tempo.' });
    }

    if (body.daily && body.day) {
      return res.status(400).json({ msg: 'Regra inválida. Não pode ter uma regra que é diariamente informando um dia.' });
    }

    if (body.weekly && body.day) {
      return res.status(400).json({ msg: 'Regra inválida. Não pode ter uma regra que é semanalmente informando um dia.' });
    }

    if (!body.daily && !body.weekly && !body.day) {
      return res.status(400).json({ msg: 'Regra inválida. Um tipo de regra deve ser informado.' });
    }

    for (let i = 0; i < body.intervals.length; i++) {
      let row = body.intervals[i];

      let hora1 = row.start.split(":");
      let hora2 = row.end.split(":");

      let d = new Date();
      let data1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]);
      let data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]);

      if (data1 >= data2) {
        return res.status(400).json({ msg: 'Regra inválida. Horário de atendimento inválido' });
      }

      if (i != 0) {
        let rowPassada = body.intervals[i - 1];
        let hora2Passada = rowPassada.end.split(":");

        let data2Passada = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2Passada[0], hora2Passada[1]);

        if (data1 < data2Passada) {
          return res.status(400).json({ msg: 'Regra inválida. Horário de atendimento inválido' });
        }
      }
    }

    fs.readFile(__dirname + '/../../src/database.json', 'utf8', (err: any, data: any) => {
      if (err) {
        return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
      }

      const file = JSON.parse(data);

      if (file.regras.length == 0) {

        file.regras.push(body);

        const json = JSON.stringify(file);

        fs.writeFile(__dirname + '/../../src/database.json', json, 'utf8', (err: any) => {
          if (err) {
            return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
          }
        });

        return res.send({ msg: 'Regra cadastrada com sucesso.' });
      }

      for (let i = 0; i < file.regras.length; i++) {
        let row = file.regras[i];

        if (row.daily && row.daily == body.daily && util.checkExists(row.intervals, body.intervals)) {
          return res.status(400).json({ msg: 'Regra já cadastrada.' });
        }

        if (row.day && row.day == body.day && util.checkExists(row.intervals, body.intervals)) {
          return res.status(400).json({ msg: 'Regra já cadastrada.' });
        }

        if (row.weekly && row.weekly == body.weekly) {
          if (util.daysWeek(body.days_of_the_week, row.days_of_the_week) && util.checkExists(row.intervals, body.intervals)) {
            return res.status(400).json({ msg: 'Regra já cadastrada.' });
          }
        }
      }

      file.regras.push(body);

      const json = JSON.stringify(file);

      fs.writeFile(__dirname + '/../../src/database.json', json, 'utf8', (err: any) => {
        if (err) {
          return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
        }
      });

      return res.send({ msg: 'Regra cadastrada com sucesso.' });
    });
  }

  public delete(req: Request, res: Response) {
    let body = req.body;

    const filePath = __dirname + '/../../src/database.json';

    fs.readFile(filePath, 'utf8', (err: any, data: any) => {
      if (err) {
        return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
      }

      let json = JSON.parse(data);

      if (!json.regras || json.regras.length == 0) {
        return res.send({ msg: 'Nenhuma regra foi encontrada para ser excluída.' });
      }

      let controle = false;

      var result = <any>[];

      for (let i = 0; i < json.regras.length; i++) {
        let row = json.regras[i];

        if (row.weekly != body.weekly || row.daily != body.daily || row.day != body.day) {
          result.push(row);
          continue;
        } else {
          if (!util.daysWeek(body.days_of_the_week, row.days_of_the_week) || !util.checkExists(row.intervals, body.intervals)) {
            result.push(row);
            continue;
          } else {
            controle = true;
          }
        }
      }

      let final = { regras: result };

      fs.writeFile(__dirname + '/../../src/database.json', JSON.stringify(final), 'utf8', (err: any) => {
        if (err) {
          return res.status(400).json({ msg: 'Algum erro inesperado aconteceu, aguarde um momento e tente novamente.' });
        }

        if (controle) {
          return res.send({ msg: 'Regra excluída com sucesso.' });
        }

        return res.send({ msg: 'Nenhuma regra foi encontrada para ser excluída.' });
      });
    });
  }
}

export default new RegraController();