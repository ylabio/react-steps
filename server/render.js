const ejs = require('ejs');
const path = require('path');
const templates = path.join(__dirname, '../templates');
// Заглушка с источником данных. В реальности данные в базе данных
let data = require('./data.js');

module.exports = function (name, query) {

  // Данные для рендера в шаблон
  const pageCurrent = data.validatePage(query.page);
  const pageCount = data.getPageCount();
  const list = data.getList(pageCurrent);

  // Рендер шаблона
  return ejs.renderFile(path.join(templates, 'index.html'), {
    pageCurrent,
    pageCount,
    list
  });
}