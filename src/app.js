const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app  = express();
const forecast = require('./util/forecast');
const geocode = require('./util/geocode');


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname + '/../public');
const viewsPath = path.join(__dirname + '/../templates/views');
const partialsPath = path.join(__dirname + '/../templates/partials'); 


//Setup handlebars engine and views location. Template Engine = handlebars.
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static( publicDirectoryPath ) );


app.get('',(req,res)=>{
    
    res.render('index',{
        title:"Weather",
        name:"Shubham"
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text.',
        title:'HELP PAGE',
        name:'Shubham'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Shubham"
    });
});

app.get('/weather',(req,res) =>{
    if(!req.query.address){
       return  res.send('Please provide address...');
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {

        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                return res.send({error});
            };

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });
});

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:"about page title",
        name:"Shubham",
        errorMessage:"Help aricle not found."
    });
});

app.get('*',(req,res) =>{
    res.render('404',{
        title:"about page title",
        name:"Shubham",
        errorMessage:"Article not found."
    });
});


app.listen(3000);