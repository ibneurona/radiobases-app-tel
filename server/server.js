const express = require('express');
const csv2json = require('csv2json');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');

const port = process.env.PORT || 8001;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const fileCSV = 'Radiobases-2019.csv';

let data = require('./data.json');

fs.createReadStream(fileCSV)
.pipe(csv2json({
  // Defaults to comma.
  separator: ','
}))
.pipe(fs.createWriteStream('data.json'));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/', (req, res) => {
  res.send('RADIOBASE API');
});

app.get('/api/radiobases', (req, res) => {
  res.status(200).json(data);
});

/* app.get('/api/radiobases/:radiobase_id', (req, res) => {
  let id = req.param.radiobase_id
  data.
  res.status(200).json(data);
}); */

app.listen(port, () => { console.log(`El servidor esta corriendo en el puerto ${port}`)});