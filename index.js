const http = require("http");
const fs =  require("fs");
var requests = require('requests');
  
const replaceVal= (tempVal,orgVal) => {
            let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
             temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
             temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
             temperature = temperature.replace("{%location%}",orgVal.name);
             temperature = temperature.replace("{%country%}",orgVal.sys.country);
             temperature = temperature.replace("{%tempstatus%}",orgVal.weather[0].main);

             return temperature;
};
const homeFile =fs.readFileSync("home.html","utf-8");

const server =http.createServer((req,res)=>  {

    if(req.url == "/")
    {
        requests('http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=70395ce0365e260710e581d21fc5b9ae')
      .on('data', (chunk) =>{
          const objData= JSON.parse(chunk);
          const arrData = [objData];
        // console.log(arrData[0].temp.main)
         const realTimeData = arrData.map((val )=>replaceVal(homeFile,val)).join("")
        //  console.log(realTimeData)

        
        res.write(realTimeData) ;   
    })
        .on('end', (err) => {
         if (err) return console.log('connection closed due to errors', err);
        res.end();
});
    }

})

 server.listen(8005,"127.0.0.1" )



