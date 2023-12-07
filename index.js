const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const request = require('request')
const config = require('./config')
const port = config.PORT

app.use('/static', express.static(path.join(__dirname, 'public/static')))

app.get('/', (req, res) => {
  const topic = req.query.topic || 'cats'; 
  const filename = `public/static/data/${topic}.json`;
  const topicListFile = 'public/static/data/topicList.json'

  // Check if the file exists
  if (fs.existsSync(filename)) {
    // If the file exists, send the index.html file
    res.sendFile(path.join(__dirname, 'public/index.html'));
  } else {
    // If the file doesn't exist, make the API request
    const options = {
      url: `https://api.artic.edu/api/v1/artworks/search?q=${topic}&limit=100`,
      headers: {
        'Accept': 'application/json'
      }
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        // Write the data to a new file
        fs.writeFile(filename, JSON.stringify(info), (err) => {
          if (err) throw err;

          // Add the topic to the topicList.json file
          let topicList = [];
          if (fs.existsSync(topicListFile)) {
            topicList = JSON.parse(fs.readFileSync(topicListFile));
          }
          if (!topicList.includes(topic)) {
            topicList.push(topic);
            fs.writeFile(topicListFile, JSON.stringify(topicList), (err) => {
              if (err) throw err;
              console.log('The file has been saved!');
              res.sendFile(path.join(__dirname, 'public/index.html'));
            });
          }
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});