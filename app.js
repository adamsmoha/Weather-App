const express= require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.htm');
});

app.post('/',(req,res)=>{
    const query=req.body.cityName;
    const apiKey='b5444fefae497fc69c523c0393dcadf0';
    const units='metric';
    const url =`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${query}&units=${units}`;
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<p>The weather is currently ${desc} </p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`);
            res.write(`<img src='${image}'/>`);
            res.send();
        })
    })
})

app.listen(3000,()=>console.log('Server started at Port 3000'));