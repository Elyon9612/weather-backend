"use strict"

var express = require('express')
var app = express()

app.listen(3000)
console.log('Node.js Express server id running on port 3000...')

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
	const origin = req.headers.origin;
		
	if (allowedOrigins.includes(origin)) {
	  res.setHeader('Access-Control-Allow-Origin', origin);
	}

	// Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader != "undefined") {
	  const bearer = bearerHeader.split(" ");
	  const bearerToken = bearer[1];
	  req.token = bearerToken;
	  next();
	}

	// Pass to next layer of middleware
	next();
  });


app.get('/data/2.5/weather', get_weather)
app.get("/v1/weather", get_weather)
app.post("/v1/auth", auth);
app.get("/v1/hello", greet);

function get_weather(request, response) {
    response.json( {
      "coord": {
        "lon": -123.262,
        "lat": 44.5646
      },
      "weather": [
        {
          "id": 741,
          "main": "Fog",
          "description": "fog",
          "icon": "50n"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 276.57,
        "feels_like": 276.57,
        "temp_min": 274.72,
        "temp_max": 279.05,
        "pressure": 1024,
        "humidity": 79
      },
      "visibility": 805,
      "wind": {
        "speed": 0,
        "deg": 0
      },
      "clouds": {
        "all": 100
      },
      "dt": 1642320503,
      "sys": {
        "type": 2,
        "id": 2012991,
        "country": "US",
        "sunrise": 1642347934,
        "sunset": 1642381185
      },
      "timezone": -28800,
      "id": 5720727,
      "name": "Corvallis",
      "cod": 200
    } )
}

function greet(req, res) {
    if (req.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthcmwgQWRyaWFubyIsImlhdCI6MTUxNjIzOTAyMn0.STyNSCjMt9cKNL6YVfLRTBabPbzbW1FDRebDqTwC2-c") {
      res.json({
        "greeting": "Elyon says Hello" 
      });
    }
    else {
      res.sendStatus(401);
    }
}

function auth(req, res) {
    res.json( {
      "access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkthcmwgQWRyaWFubyIsImlhdCI6MTUxNjIzOTAyMn0.STyNSCjMt9cKNL6YVfLRTBabPbzbW1FDRebDqTwC2-c",
      "expires": "2022-02-11T23:59:59.999-08:00"
    } )
}
