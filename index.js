const express = require('express');
const bodyparser = require('body-parser');
const https = require('https');
const axios = require("axios");

const app = express();

app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine' , 'ejs');

app.get('/', (req, res) => {
    let url = 'https://api.covid19api.com/summary';
    let country = 'https://api.covid19api.com/countries';


    axios.all([
        axios.get(url),
        axios.get(country)
    ]).then(array => {
        res.render("index", {
                    summary : array[0],
                    countries : array[1]
                });
        console.log(array[1]);
    })
    // https.get(url,(response) =>{
    //     let data = '';
    // console.log(response.statusCode);
    // response.on("data", (chunk) => {
    //     data += chunk;
    // })
    // response.on('end', () => {
    //     let summary = JSON.parse(data);
    //     let todayCount = summary.Global.NewConfirmed.toLocaleString();
    //     let totalConfirmed = summary.Global.TotalConfirmed.toLocaleString();
    //     let newDeaths = summary.Global.NewDeaths.toLocaleString();
    //     let totalDeaths = summary.Global.TotalDeaths.toLocaleString();
    //     let newRecovered = summary.Global.NewRecovered.toLocaleString();
    //     let totalRecovered = summary.Global.NewConfirmed.toLocaleString();
    //     res.render("index", {
    //         'totalConfirmed' : totalConfirmed,
    //         'todayCount' : todayCount,
    //         'newRecovered' : newRecovered,
    //         'newDeaths' : newDeaths,
    //         'totalDeaths' : totalDeaths,
    //         'totalRecovered' : totalRecovered
    //     });
    // });
    // });
    
})

app.post('/', (req,res) =>{
    let country = req.body.country;
    let url = "https://api.covid19api.com/country/" + country;
   
    function getcount() { 
      return axios.get(url) .then(response =>{
        return response.data;
    })
}
getcount()
.then(data =>{
    res.json({data})
}).catch(err => console.log(err))

})


app.listen(3000, () =>{
    console.log("successfully connected")
})