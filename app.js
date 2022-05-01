const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');

//port configuration
const PORT = 3000;

//let requests wrote in json without any problem
app.use(express.json())


// allowing which folder can be serviced to users
app.use(express.static(__dirname+'public/htmls'));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', routes);

//starting server
app.listen(PORT, () =>{
    console.log(`Listen : ${PORT}`);
});


//module.exports = router;