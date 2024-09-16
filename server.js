const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send('Hi this is NODE JSSSSSSS, RS game tech is here')
}) 

app.get('/ritam', function(req, res){
    res.sendFile(__dirname + "/index.html")
}) 

app.listen('3000', function(){
    console.log('Server is listening on port 3000')
})