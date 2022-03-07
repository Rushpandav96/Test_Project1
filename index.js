const express = require("express");
const app = express();
app.use(logger);

app.get("/books", function(req,res){
    return res.send({route: "/books", role:req.role});
});

app.get("/libraries",checkPermission("librarian"), function(req,res){
     return res.send("allowed");
});

app.get("/authors", checkPermission("author"), function(req,res){
    return res.send("allowed");
});


function checkPermission(role){
    return function logger(req,res,next){
        if(role === "author"){
            return next();
        }
        else if(role === "librarian"){
            return next();
        }
        return res.send("invalid request");
    };
}

function logger(req,res,next){
    if(req.path ==="/books"){
        req.role = "Someone";
    }
    else if(req.path ==="/libraries"){
        req.role = "librarian"
    }
    else if(req.path ==="/authors"){
        req.role = "author";
    }
    console.log("logger call");
    next();
}


app.listen(1010 , ()=>{
    console.log("hearing to 1010");
});