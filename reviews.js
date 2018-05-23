var queryResult;
$(async function () {
	const a = await getSmth();
	const b = parseResults(a);
	//const c = generatePage(b);
	app1.reviews = b;
	const c = await getCritics();
	const d = parseResults(c);
	app1.topCritics = d;
	queryResult = b;
});

function generatePage(queryResult){
	var filmListPanel = $('#film-list');
	queryResult.forEach((item)=>{
		filmListPanel.append(generateCard(item.TITLE,
			'Год выхода: ' + item.RELEASE_DATE 
			+ '<br> Режиссер: ' + item.DIRECTOR
			));
		});
}

function generateCard(title, bodyText) {
	var cardTemplate = `<div class="card"> 
		<div class="card-body">
    	<h5 class="card-title">`+title+`</h5>
    	<p class="card-text">`+bodyText+`</p>
    	<a href="#" class="btn btn-primary info-button" onclick="showInfo('`+title+`')">Инфо</a>
  		</div>
	</div>`;
	return cardTemplate;
}

function generateInfo(title, year, director) {
	var template = `
	<div class="panel">
	<h3>` + title + `</h3>
	<hr>
	<p>Год выхода: `+year+`</p>
	<p>Режиссер: `+ director +`</p>
	</div>`;
	return template
}

async function getSmth() {
	console.log("Выполняем запрос к reviews");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
	xhr.open('GET', 'http://localhost:8020/reviews', false);
	// 3. Отсылаем запрос
	xhr.send();
	// 4. Если код ответа сервера не 200, то это ошибка
	if (xhr.status != 200) {
	  // обработать ошибку
	  return 1; // пример вывода: 404: Not Found
	} else {
	  // вывести результат
	  return xhr.responseText; // responseText -- текст ответа.
	}
}

function parseResults(responseText) {
	let data = responseText.split('END')[0];
	var decodedData = JSON.parse(data);
	console.log(decodedData);
	return decodedData;
}

// function showInfo(filmTitle) {
// 	queryResult.forEach(async (film)=>{
// 		if(film.TITLE === filmTitle) {
// 			$('.all').hide();
// 			$('.about').html(generateInfo(film.TITLE, film.RELEASE_DATE,film.DIRECTOR));
// 			$('.info').show();
// 			const a = await getReviews(film.ID_FILM);
// 			app1.yourReview.film_id = film.ID_FILM;
// 			app1.reviews = parseResults(a);
// 		}
// 	});
// }

// function showAll() {
// 			$('.all').show();
// 			$('.personal').html('');
// 			$('.info').hide();
// 			app1.yourReview.film_id = 1;
// }

var app1 = new Vue({
	el: '.main-cont',
	data: {
		reviews: [],
		topCritics: [],
	}
});

// function submitReview() {
// 	console.log("Отправляем отзыв");
// 	// 1. Создаём новый объект XMLHttpRequest
// 	var xhr = new XMLHttpRequest();
// 	// 2. Конфигурируем его
// 	xhr.open('get', 'http://localhost:8020/reviews', false);
// 	// 3. Отсылаем запрос
// 	//xhr.setRequestHeader("Content-type", "application/json");
// 	xhr.send();
// 	// 4. Если код ответа сервера не 200, то это ошибка
// 	if (xhr.status != 200) {
// 	  // обработать ошибку
// 	  alert('Ошибка!');
// 	  return 1; 
// 	} else {
// 	  // вывести результат
// 	  if(xhr.responseText == 'SUCCESS!') {
	
// 	  }
// 	  return xhr.responseText; 
// 	}
// }

async function getCritics() {
	console.log("Выполняем запрос к отзывам");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос
	xhr.open('GET', 'http://localhost:8020/reviews/top', false);
	// 3. Отсылаем запрос
	xhr.send();
	// 4. Если код ответа сервера не 200, то это ошибка
	if (xhr.status != 200) {
	  // обработать ошибку
	  return 1; // пример вывода: 404: Not Found
	} else {
	  // вывести результат
	  return xhr.responseText; // responseText -- текст ответа.
	}
}

