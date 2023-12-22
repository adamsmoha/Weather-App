const express= require('express');
const https = require('https');

const app = express();

app.get('/',(req,res)=>{
    const url ='https://api.openweathermap.org/data/2.5/weather?appid=b5444fefae497fc69c523c0393dcadf0&q=Ghana&units=metric';
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The weather is currently ${desc} </p>`);
            res.write(`<h1>The temperature in Ghane is ${temp} degrees Celcius.</h1>`);
            res.write(`<img src='${image}'/>`);
            res.send();
        })
    })
});


app.listen(3000,()=>console.log('Server started at Port 3000'));