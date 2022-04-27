const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes/index')

//port configuration
const PORT = 3000;

//allowing which folder can be serviced to users
app.use(express.json())
app.use(express.static(__dirname+'public/htmls'));
app.use(bodyParser.urlencoded({extended:true}));

//respond with the file when a GET request is made to the / page
app.post("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

//starting server
app.listen(PORT, () =>{
    console.log(`Listen : ${PORT}`);
});
