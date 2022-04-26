const express = require("express");
const app = express();
const PORT = 3000;

//getting static files
app.use(express.static('/htmls'));

//routing definition
app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

//starting server
app.listen(PORT, () =>{
    console.log(`Listen : ${PORT}`);
});
