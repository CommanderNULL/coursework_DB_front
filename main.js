var queryResult;
$(async function () {
	const a = await getSmth();
	const b = parseResults(a);
	const c = generatePage(b);
	queryResult = b;
});

function generatePage(queryResult){

	var filmListPanel = $('#film-list');
	queryResult.forEach((item)=>{
		filmListPanel.append(generateCard(item.TITLE,
			'Год выхода: ' + item.RELEASE_DATE.split('-')[0] 
			+ '<br> Режиссер: ' + item.DIRECTOR
			));
		});
}

function generateCard(title, bodyText) {
	var cardTemplate = `<div class="card"> 
		<div class="card-body">
    	<h5 class="card-title">`+title+`</h5>
    	<p class="card-text">`+bodyText+`</p>
    	<a href="#" class="btn btn-primary" onclick="showInfo('`+title+`')">Инфо</a>
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
	<a href="#" class="btn btn-primary" onclick="showAll()">Go back</a>
	</div>`;
	return template
}

async function getSmth() {
	console.log("Выполняем запрос к films");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос на URL 'phones.json'
	xhr.open('GET', 'http://localhost:8020', false);
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

function showInfo(filmTitle) {
	queryResult.forEach((item)=>{
		if(item.TITLE === filmTitle) {
			$('.all').hide();
			$('.info').html(generateInfo(item.TITLE, item.RELEASE_DATE.split('-')[0],item.DIRECTOR));
			$('.info').show();
		}
	});
}

function showAll() {
			$('.all').show();
			$('.info').html('');
			$('.info').hide();
}