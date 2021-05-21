const list = [
  {code: 1, title: 'Название элемента'},
  {code: 2, title: 'Некий объект'},
  {code: 3, title: 'Заголовок'},
  {code: 4, title: 'Короткое название'},
  {code: 5, title: 'Запись'},
  {code: 6, title: 'Пример названия'},
  {code: 7, title: 'Седьмой'},
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

  validatePage(page = 1){
    return Math.max(1, Math.min(data.getCount(), page));
  },

};

module.exports = data;