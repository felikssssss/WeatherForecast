const apiKey = '5f100482c03642beb1e193914240408';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

form.onsubmit = function (event) {
  // Отменяем отправку данных на сервер
  event.preventDefault();

  let town = input.value.trim();
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${town}`;

  // Удаляем предыдущую карту, если она есть
  const prevCard = document.querySelector('.card');
  if (prevCard) {
    prevCard.remove();
  }

  // Отправляем запрос и создаем карточку
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Проверка на наличие ошибки в данных
      if (data.error) {
        const errorHtml = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML('afterend', errorHtml);
      } else {
        // Создаем и вставляем HTML с данными о погоде
        const html = `<div class="card">
          <h2 class="card-town">${data.location.name}<span class="">${data.location.country}</span></h2>
      
          <div class="card-response">
            <div class="card-temperature">${data.current.temp_c}<sup>°c</sup></div>
            <img src="${data.current.condition.icon}" alt="Weather" class="card-img">
          </div>
      
          <div class="card-descr">${data.current.condition.text}</div>
        </div>`;

        header.insertAdjacentHTML('afterend', html);
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};
