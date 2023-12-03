const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const request = require('request')
const config = require('./config')
const port = config.PORT



app.use('/static', express.static(path.join(__dirname, 'public/static')))




app.get('/', (req, res) => {
  fs.readFile('public/static/data/artworks.json', 'utf8', (err, data) => {
    if (err || !data) {
      const options = {
        url: 'https://api.artic.edu/api/v1/artworks?page=2&limit=100',
        headers: {
          'Accept': 'application/json'
        }
      };

      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          fs.writeFileSync('public/static/data/artworks.json', JSON.stringify(info));  // Use writeFileSync here
          console.log('The file has been saved!');
          res.redirect('/artworks.js'); // Redirect to the artworks.js page
        }
      });
    } else {
      res.redirect('/artworks.js'); // Redirect to the artworks.js page
    }
  });
});



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});