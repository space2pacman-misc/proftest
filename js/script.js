var answer = document.querySelectorAll(".answer");
var button = document.querySelector(".button");
var form = document.querySelector(".form");
var count = 0;
var directionObj = {
	programming: 0,
	testing: 0,
	design: 0,
	businessAnalysis: 0,
	gameDev: 0,
	internetMarketing: 0
}

button.addEventListener("click", getResult);

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

function clear() {

}

function getResult() {
	if(validate()) {
		checkAnswer();

		if (count>0)
			//document.test.s1.value="Вы выполнили не все задания. Проверьте себя!"
			console.log("Вы выполнили не все задания. Проверьте себя!")
		else
		{
			getAnswer();
			eventRecovery();
		}
		
	}
					
}

function checkAnswer() {
	for(var i = 0; i < answer.length; i+=2) {

		// Если один из ответов не отмечен то count++
		if(!answer[i].checked && !answer[i+1].checked) {
			count++
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