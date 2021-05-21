// Находим DOM с заготовкой под новые записи
var mockItemElement = document.querySelectorAll('#mocks .List__item')[0];

// Находим DOM списка записей
var listElement = document.querySelectorAll('.Page .List')[0];

// Обработчик на кнопку Добавить
var addButtonElements = document.querySelectorAll('a[data-action="create"]');
addButtonElements.forEach(function (item) {
  // Регистрируем обработку клика на Добавить
  item.addEventListener("click", function (target) {
    // Отмена перехода по ссылке браузером
    target.preventDefault();
    addItem();
  });
});

// Обработчики на все существующие кнопки Удалить
var deleteButtonElements = document.querySelectorAll('a[data-action="delete"]');
deleteButtonElements.forEach(function (item) {
  // Регистрируем обработку клика на Добавить
  item.addEventListener("click", function (target) {
    // Отмена перехода по ссылке браузером
    target.preventDefault();
    deleteItem(item.getAttribute('data-code'));
  });
});

/**
 * Добавление записи
 */
function addItem() {
  // Выполняем запрос к серверу
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '/?action=create', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Получаем созданный на сервер объект
      var item = JSON.parse(xhr.responseText);

      // Добавляем DOM
      var newItemElement = mockItemElement.cloneNode(true);
      newItemElement.setAttribute('data-code', item.code);
      newItemElement.querySelectorAll('.Item__number')[0].textContent = '№' + item.code;
      newItemElement.querySelectorAll('.Item__title')[0].textContent = item.title;
      newItemElement.querySelectorAll('.Item__actions > a')[0].addEventListener("click", function (target) {
        // Отмена перехода по ссылке браузером
        target.preventDefault();
        deleteItem(item.code);
      });
      listElement.appendChild(newItemElement);
    }
  };
  xhr.send();
}

/**
 * Удаление записи
 * @param code
 */
function deleteItem(code) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '/?action=delete&code='+code, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Удаляем DOM
      listElement.querySelectorAll('.List__item[data-code="'+code+'"]')[0].remove();
    }
  };
  xhr.send();
}

