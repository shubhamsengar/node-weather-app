const request = require('request');

const forecast = function(latitude,longitude,callback){

    const url = "http://api.weatherstack.com/current?access_key=93530adfb9516fd5c04e12d8a132b41e&query="+latitude+","+longitude;

    request({url,json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to location services!',undefined);
        }
        else if(body.error){
            callback('Unbable to find location services.',undefined);
        }
        else{
            callback(undefined,"SUMMARY:"+body.current.weather_descriptions[0]+". Current temperature is "+body.current.temperature+" degree celcius. It feels like "+body.current.feelslike+" degree celcius. \nChances of raining are, "+body.current.precip+"%.");
        }
    });

};

module.exports = forecast;