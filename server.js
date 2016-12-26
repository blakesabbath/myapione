var express = require("express");
var app = express();
var url = require("url")
var strftime = require("strftime")
var moment = require("moment")

app.get('/:query',function(req,res){
    var id = req.params.query;
    var unix = null
    var natural = null
    
    // check jika ini adalah unixtime
    if( +id >= 0 ){
        unix = +id
        natural = unixToNat(unix)
    }
    
    // check jika natural time
    if(isNaN(+id) && moment(id, "MMMM D, YYYY").isValid()){
       unix = natToUnix(id)
       natural = unixToNat(unix)
    }
    
    var jsonObj = {"unix":unix,"natural":natural}
    res.send(JSON.stringify(jsonObj))
    
});

app.listen(8080,function(){
    console.log('Server Run on port 8080');
});

function natToUnix(date) {
    // Conver from natural date to unix timestamp
    return moment(date, "MMMM D, YYYY").format("X");
}
    
function unixToNat(unix) {
    // Convert unix timestamp to natural date
    return moment.unix(unix).format("MMMM D, YYYY");
}

