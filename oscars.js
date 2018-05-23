var queryResult;
$(async function () {
	const c = await getOscars(2);
	const d = parseResults(c);
	app1.oscars = d;
});

function parseResults(responseText) {
	let data = responseText.split('END')[0];
	var decodedData = JSON.parse(data);
	console.log(decodedData);
	return decodedData;
}

var app1 = new Vue({
	el: '.main-cont',
	data: {
		oscars: [],
	}
});

async function catChanged(id_c) {
	const c = await getOscars(id_c);
	const d = parseResults(c);
	app1.oscars = d;
}

async function getOscars(id_c) {
	console.log("Выполняем запрос к оскарам");
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	// 2. Конфигурируем его: GET-запрос
	xhr.open('GET', 'http://localhost:8020/oscars/'+id_c, false);
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

