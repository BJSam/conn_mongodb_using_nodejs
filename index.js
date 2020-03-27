const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const uri = "mongodb+srv://chinna:Chinna@944@cluster0-11ctr.mongodb.net/test1?retryWrites=true&w=majority";
var app = express();
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
// 
const mongoose= require("mongoose");
mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true } ,(err)=>{if(err)console.log(err); else console.log("connected to mongodb Server");});
// mongoose.createConnection(uri,{ useUnifiedTopology: true } );
app.listen( process.env.PORT || 3300, (err) => {
    if (err)
      console.log(err);
    else
      console.log("listning at 3300");
  });
var query = { name: "munna" };
var Schema = mongoose.Schema;  
       
// todos  
var data = new Schema({  
    name: {  
        type: String,  
        required: true  
    },
    age:{
        type: String,  
        required: true   
    } 
},{ collection : 'testdata' });  
   
var Todos = mongoose.model('toos', data);  

app.get('/tdos', function(req, res) {  
    Todos.find({}, function(err, data) {  
   
        if (!data) {  
            res.statusCode = 404;  
   
            return res.json({  
                error: 'Not found'  
            });  
        };  
   
        if (!err) {  
            // return res.json({  
            //     status: 'OK',  
            //     todos: dos  
            // });  
            res.send(data);
        } else {  
            res.statusCode = 500;  
            //  log.error('Internal error(%d): %s',res.statusCode,err.message);  
   
            return res.json({  
                error: 'Server error'  
            });  
        };  
    });  
});  




app.get("/", (req, res) => {
   res.send("hii");

});
app.post("/snd",(req,res)=>{
   // res.send('welcome, ' + req.body.name+req.body.age);
   Todos.create(req.body,(err,dta)=>{
       if(err){
        return res.json({  
            status: 'failed',  
            todos: "error"+err 
        });
       }
       else{
        return res.json({  
            status: 'ok',  
            todos: "data inserted"+req.body 
        });
       }
   })
    // console.log(req.body.name+","+req.body.age);
    //        return res.json({  
    //             status: 'OK',  
    //             todos: req.body  
    //         });
});
app.delete('/:tagId', function(req, res) {
   // res.send("tagId is set to " + req.params.tagId);
    Todos.deleteOne({_id:req.params.tagId},(err,dt)=>{
        if(err){
            return res.json({
                status: 'failed',  
                todos: "error: "+err 
            });
        }
        else
        return res.json({
            status: 'ok',  
            todos: "deleted: "+dt
        });
    })
  });
  app.put('/:tagId', function(req, res) {
    // res.send("tagId is set to " + req.params.tagId);
     Todos.update({_id: req.params.tagId},req.body,(err,dt)=>{
         if(err){
             return res.json({
                 status: 'failed',  
                 todos: "error: "+err 
             });
         }
         else
         return res.json({
             status: 'ok',  
             todos: "updated: "+dt
         });
     })
   });