const express = require("express");
const app = express();
const PORT = 3000;

//allowing which folder can be serviced to users
app.use(express.static(__dirname+'/htmls'));

//routing definition
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

//starting server
app.listen(PORT, () =>{
    console.log(`Listen : ${PORT}`);
});
