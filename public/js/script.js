var answer = document.querySelectorAll(".answer");
var button = document.querySelector(".button");
var clearButton = document.querySelector(".clear");
var alertElement = document.querySelector(".alert");
var form = document.querySelector(".form");
var testResultJson = document.querySelector(".testResultJson");
var unmarkedAnswers = 0;
var directionTranslate = {
	programming: "Программирование",
	testing: "Тестирование",
	design: "Дзайн",
	businessAnalysis: "Бизнес-анализ",
	gameDev: "Разработка игр",
	internetMarketing: "Интернет-маркетинг"
};
var directionObj = {
	programming: 0,
	testing: 0,
	design: 0,
	businessAnalysis: 0,
	gameDev: 0,
	internetMarketing: 0
}

button.addEventListener("click", getResult);
clearButton.addEventListener("click", clearForm)


function eventRecovery() {
	form.onsubmit = function(e) {
		return true;
	}
}

function removeClass(el,className) {
	for(var i = 0; i < el.length; i++) {
		el[i].classList.remove(className);
	}
}

function validate() {
	var children = form.children;
	var count = 0;
	var formEl = 0;

	// Отмена стандартного события формы
	form.onsubmit = function(e) {
		e.preventDefault();
	}

	// Цикл по всем дочерним элементам формы
	for(var i = 0; i < children.length; i++) {

		// Проверка на присутствие класса form-input
		if(children[i].classList.contains("form-input")) {
			// Счетчик элементов с классом form-input
			formEl++;
			// Проверка на не пустой input
			if(children[i].value.length == 0) {
				children[i].classList.add("uk-form-danger");
				setTimeout(function() {
					removeClass(form.children,"uk-form-danger");
				},1000)
			} else {
				children[i].classList.remove("uk-form-danger");
				// Если input не пустой то count++
				count++;
			}
		}
	}
	// Проверка на соответствие
	if(count == formEl) {
		return true;
	} 
}

function showAlert() {
	alertElement.classList.add("show");
	setTimeout(function() {
		alertElement.classList.remove("show");
	}, 3000)
}

function clearForm() {
	answer.forEach(function(item) {
		item.checked = false;
	})
	unmarkedAnswers = 0;
}

function getResult() {
	if(validate()) {
		checkAnswer();

		if (unmarkedAnswers>0) {
			showAlert();
		} else {
			getAnswer();
			eventRecovery();
			jsonToInput();
		}
		
	}
					
}

function jsonToInput() {
	var obj = {};

	for (item in directionObj) {
		obj[directionTranslate[item]] = directionObj[item]
	}

	testResultJson.value = JSON.stringify(obj);
}

function checkAnswer() {
	unmarkedAnswers = 0;

	for(var i = 0; i < answer.length; i+=2) {

		// Если один из ответов не отмечен то unmarkedAnswers++
		if(!answer[i].checked && !answer[i+1].checked) {
			unmarkedAnswers++
		}
	}
}

function getAnswer() {
	for(var i = 0; i < answer.length; i++) {
		// Проверка на сущестование атрибута
		if (answer[i].getAttribute("data-direction") == null) continue
		// Проверка на пустой атрибут
		if (answer[i].getAttribute("data-direction") == "") continue

		if(answer[i].checked) {
			var direction = answer[i].getAttribute("data-direction").split(" ");

			for(var j = 0; j < direction.length; j++) {
				directionObj[direction[j]]++;
			}
		} 
							
	}
}