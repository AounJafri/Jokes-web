import ejs from "ejs";
import axios from "axios";
import express from "express";
import bodyParser from "body-parser";
// Setting up the app
const app = express();
const port = 3000;

// Using body parser middleware to parse responses
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// When first visited index.ejs will be rendered with a random joke
app.get("/", async(req,res)=>{

    try {
        const response =await axios.get("https://v2.jokeapi.dev/joke/Any?type=single"); 
        res.render("index.ejs" , {data: response.data});
        
    } catch (error) {
        console.log(error);
        res.render("index.ejs" , { error: "No joke match your criteria"});
    }
});

// When response is submitted based on it joke will be provided
app.post("/form", async(req,res)=>{

    var category = req.body.category;
    var blf = req.body.blackListFlags;

    // console.log(req.body.category +"  " + req.body.blackListFlags);
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/"+category+"?type=single&blacklistFlags="+blf);
        res.render("index.ejs" , { data: response.data});
    } catch (error) {
        console.log(error);
        res.render("index.ejs" , { error: "No joke match your criteria"});
    }


});


app.listen(port,()=>{
    console.log("Server is running on "+port);
});