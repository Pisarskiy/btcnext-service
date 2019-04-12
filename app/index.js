const rp = require('request-promise');
const fs = require('fs');
const api = require('./api')

const config = require('./config');

const coinmarketcapAPI = () => {
  
  const reqOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      start: 1,
      limit: 5000,
      convert: 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': config.API_key_coinmarketcap
    },
    json: true,
    gzip: true
  };

  rp(reqOptions).then(response => { 
    jsonData = JSON.stringify(response);
  
    fs.writeFile('app/src/data.json', jsonData, err => {
      if (err) {
        throw err;
      }
      console.log('Coinmarketcap data updated')
    })
      
  }).catch((err) => {
    console.log('Coinmarketcap API error:', err.message);
  });  
}

const coinmarketcalAPI = () => {
  const reqOptions = {
    method: 'GET',
    uri: 'https://developers.coinmarketcal.com/v1/events',
    qs: {
    },
    headers: {
      'x-api-key': config.API_key_coinmarketcal
    },
    json: true,
    gzip: true
  };

  rp(reqOptions).then(response => { 
    
    jsonData = JSON.stringify(response.body);
  
    fs.writeFile('app/src/events.json', jsonData, err => {
      if (err) {
        throw err;
      }
      console.log('Coinmarketcal events updated')
    })
      
  }).catch((err) => {
    console.log('Coinmarketcall API events error:', err.message);
  }); 
}

setInterval(coinmarketcapAPI, config.request_interval);
setInterval(coinmarketcalAPI, config.request_interval)

api();