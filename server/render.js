const ejs = require('ejs');
const path = require('path');
const templates = path.join(__dirname, '../templates');
// Заглушка с источником данных. В реальности данные в базе данных
let data = require('./data.js');

module.exports = function (name, query) {

  // Разбор действия по параметрам запроса
  if (query.action==='create'){
    const item = data.addItem({title: 'Новая запись'});
    return JSON.stringify(item);
  } else
  if (query.action==='delete' && query.code){
    data.deleteItem(query.code)
    return true;
  }

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