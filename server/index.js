const express = require('express');
const app = express();
const PORT = 3000;
const render = require('./render.js');

// Статик файлы
app.use(express.static('public'));

// Генерация ответа
app.use(async (req, res) => {
  let name = /\/$/.test(req.url) ? req.url + 'index.html' : req.url;
  res.send(
    await render(name, req.query)
  );
});

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server started", `http://localhost:${PORT}`);
});