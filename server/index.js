const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const options = {
  root: path.join(__dirname, '../front')
};

// Отправка файлов на любой запрос
app.get('/*', (req, res) => {
  let fileName = /\/$/.test(req.url) ? req.url + 'index.html' : req.url;
  res.sendFile(fileName, options,);
});

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server started", `http://localhost:${PORT}`);
});