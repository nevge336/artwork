const express = require('express')
const app = express()
const fs = require('fs')
const request = require('request')
const config = require('./config')
const port = config.PORT
const api_key = config.API_KEY

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port || 5000, () => {
    console.log(`Server running on port ${port}`)
})