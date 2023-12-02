const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const request = require('request')
const config = require('./config')
const port = config.PORT

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/static', express.static(path.join(__dirname, 'public/static')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});


app.get('/artworks', (req, res) => {
  fs.readFile('data/artworks.json', 'utf8', (err, data) => {
    if (err || !data) {
      const options = {
        url: 'https://api.artic.edu/api/v1/artworks',
        headers: {
          'Accept': 'application/json'
        }
      };

      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          fs.writeFile('public/static/data/artworks.json', JSON.stringify(info), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
          res.send(info);
        }
      });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});