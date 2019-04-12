const express = require('express');
const fs = require('fs');

const app = express();

module.exports = () => {
  app.get('/events', (req, res) => {
    fs.readFile('./app/src/events.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data);
    })  
  });
  
  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  })
}