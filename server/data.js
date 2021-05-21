let counter = 0;

const list = [
  {code: ++counter, title: 'Название элемента'},
  {code: ++counter, title: 'Некий объект'},
  {code: ++counter, title: 'Заголовок'},
  {code: ++counter, title: 'Короткое название'},
  {code: ++counter, title: 'Запись'},
  {code: ++counter, title: 'Пример названия'},
  {code: ++counter, title: 'Седьмой'},
];



const data = {

  getList(page = 1, limit = 5){
    const first = (page - 1) * limit;
    return list.slice(first, first + limit);
  },

  getCount(){
    return list.length;
  },

  getPageCount(limit = 5){
    return Math.ceil(data.getCount() / limit);
  },

  /**
   * Коррекция номера страницы, чтобы не выходила за рамки допустимого
   * @param page
   * @returns {number}
   */
  validatePage(page = 1){
    return Math.max(1, Math.min(data.getCount(), page));
  },

  /**
   * Добавление записи
   * @param item
   */
  addItem(item = {}){
    item.code = ++counter;
    if (!item.title){
      item.title = 'Новая запись ' + item.code;
    }
    list.push(item);
  },

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code){
    code = parseInt(code);
    const index = list.findIndex(item => item.code === code);
    if (index !== -1){
      list.splice(index, 1);
    }
  }

};

module.exports = data;