import app from "../src/app";
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const fs = require('fs');
const fileDatabase = __dirname + '/../src/database.json';
const jsonDefault = JSON.stringify({ "regras": [] });

import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('RegraController', () => {

  before(() => {
    fs.truncate(fileDatabase, 0, () => { });
    fs.writeFile(fileDatabase, jsonDefault, 'utf8', (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  });

  after(() => {
    fs.truncate(fileDatabase, 0, () => { });
    fs.writeFile(fileDatabase, jsonDefault, 'utf8', (err: any) => {
      if (err) {
        console.log('something went wrong');
      }
    });
  });

  context('index', () => {
    it('should return status 200 after get regras', async () => {
      return chai.request(app).get('/regras')
        .then(res => {
          expect(res.status).to.eql(200)
        });
    });
  });

  context('store', () => {
    it('should return status 200 after send day data', async () => {
      let body = {
        "daily": false,
        "weekly": false,
        "day": "30-01-2018",
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      };

      return chai.request(app).post('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });

    it('should return status 200 after send daily data', async () => {

      let body = {
        "daily": false,
        "weekly": true,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      };

      return chai.request(app).post('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });

    it('should return status 200 after send daily data', async () => {

      let body = {
        "daily": true,
        "weekly": false,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:30", "end": "16:50" }
        ]
      };

      return chai.request(app).post('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });
  });

  context('delete', () => {
    before(() => {
      let json = [{
        "daily": false,
        "weekly": false,
        "day": "30-01-2018",
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      }, {
        "daily": false,
        "weekly": true,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      }, {
        "daily": true,
        "weekly": false,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:30", "end": "16:50" }
        ]
      }];

      fs.writeFile(fileDatabase, JSON.stringify(json), 'utf8', (err: any) => {
        if (err) {
          console.log('something went wrong');
        }
      });
    });

    it('should return status 200 on delete a day data', async () => {

      let body = {
        "daily": false,
        "weekly": false,
        "day": "30-01-2018",
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      };

      return chai.request(app).delete('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });

    it('should return status 200 on delete a weekly data', async () => {

      let body = {
        "daily": false,
        "weekly": true,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:00", "end": "16:00" }
        ]
      };

      return chai.request(app).delete('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });

    it('should return status 200 on delete a daily data', async () => {

      let body = {
        "daily": true,
        "weekly": false,
        "day": false,
        "days_of_the_week": [
          { "day": false },
          { "day": false },
          { "day": "tuesday" },
          { "day": false },
          { "day": "thursday" },
          { "day": false },
          { "day": false }
        ],
        "intervals": [
          { "start": "13:30", "end": "16:50" }
        ]
      };

      return chai.request(app).delete('/regras').send(body)
        .then(res => {
          chai.expect(res.status).to.eql(200)
        });
    });
  });
});