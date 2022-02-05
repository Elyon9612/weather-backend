"use strict"

var express = require('express')
var app = express()

app.listen(3000)
console.log('Node.js Express server id running on port 3000...')

app.get('/data/2.5/weather', get_weather)
app.get('/v1/hello', get_hello)


function get_weather(request, response) {
    response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":281.56,"feels_like":281.56,"temp_min":279.46,"temp_max":283.9,"pressure":1032,"humidity":73},"visibility":10000,"wind":{"speed":0.89,"deg":113,"gust":1.34},"clouds":{"all":75},"dt":1642803894,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642779731,"sunset":1642813576},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
}

function get_hello(request, response){
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.json("FK bitch")
}