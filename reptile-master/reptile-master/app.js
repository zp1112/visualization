
var express=require('express');

var superagent= require('superagent');

var fs=require('fs');


var app=express();
const adcodes = require('./adcodes');
console.log(adcodes)
app.get('/', function (req, res, next) {
  for (const item of adcodes) {
    superagent.get(`https://geo.datav.aliyun.com/areas/bound/${item}.json`)
      .end(function (err, sres) { 
        console.log(sres.text)
        fs.writeFile(`${item}.json`,sres.text,function(err){
            if(err) throw err;  
            console.log('write JSON into TEXT');  
        }); 
      });
  }
});
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});