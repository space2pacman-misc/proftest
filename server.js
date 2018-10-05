var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.get("/", function(request, response) {
	response.sendFile(__dirname + "/index.html");
})

app.get("/result", function(request, response) {
	response.sendFile(__dirname + "/result.html");
})

app.post("/result", function(request, response) {
	var formData = request.body;

	fs.appendFile("data.txt", 
		"Имя: " + formData.firstName +
		" Фамилия: " + formData.lastName +
		" Email: " + formData.email + 
		" Телефон: " + formData.phone + 
		" Результат: " + formData.testResultJson +
		"\r\n"
		);

	fs.readFile("result.html", function (err, data) {
    	var result = data.toString();
    	var testResultToPage = formData.testResultJson;
    	var widget = "";

    	testResultToPage = JSON.parse(testResultToPage);

    	for(item in testResultToPage) {
    		widget += "<tr><td class='uk-text-left'><h3>" + item + "</h3></td><td class='uk-text-right'><h3>" + testResultToPage[item] + "</h3></td></tr>"
    	}

    	widget = "<table class='uk-table uk-table-small uk-table-divider'>" + widget + "</table>"

    	result = result.replace("%result%",widget)

    	response.set('Content-Type', 'text/html');
		response.send(result)
	});;
})

app.listen(7777, serverStatus);

function serverStatus() {
	console.log("Сервер создан...")
}