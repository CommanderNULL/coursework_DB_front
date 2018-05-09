var actors;
$(async function () {
	let a = await getSmth();
	actors = parseResults(a);
	var filmListPanel = $('#film-list');
	actors.forEach((item)=>{
		filmListPanel.append(generateCard(item));
		});
});

function generateCard(actor) {
	var cardTemplate = `<div class="card"> 
		<div class="card-body">
    	<h5 class="card-title">`+actor.SURNAME+`</h5>
    	<p class="card-text">`+actor.NAME+`</p>
    	<a href="#" class="btn btn-primary" onclick="showInfo('`+actor.ID_HUMAN+`')">Инфо</a>
  		</div>
	</div>`;
	return cardTemplate;
}

function generateInfo(actor) {
	var template = `
	<div class="panel">
	<h3>` + actor.NAME + ' ' + actor.SURNAME + `</h3>
	<hr>
	<p>Дата рождения: `+ actor.DOB.split('T')[0] +`
	<br>
	Список ролей:
	</p>
	<a href="#" class="btn btn-primary" onclick="showAll()">Go back</a>
	</div>`;
	return template
}

var filmList = new Vue({
	el: '#film-list',
	data: {
		films: [],
	}
});

function getSmth() {
	console.log("Выполняем запрос к актерам");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос
	xhr.open('GET', 'http://localhost:8020/actors', false);
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
	if (responseText == 1) {
		console.log("Ошибка! Запрос вернул 1");
	}
	let data = responseText;
	let decodedData = JSON.parse(data);
	console.log(decodedData);
	return decodedData;
}

async function getInfoFilms(id_h) {
	console.log("Выполняем запрос к информации актера");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос
	xhr.open('GET', 'http://localhost:8020/actors/info_films/'+id_h, false);
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

function showInfo(id_h) {
	actors.forEach(async (actor)=>{
		if(actor.ID_HUMAN.toString() == id_h.toString()) {
			$('.all').hide();
			$('.info').html(generateInfo(actor));
			$('.info').show();
			const a = await getInfoFilms(actor.ID_HUMAN);
			console.log('a = '+ a );
			filmList.films = parseResults(a);
		}
	});
}

function showAll() {
			$('.all').show();
			$('.info').html('');
			$('.info').hide();
}