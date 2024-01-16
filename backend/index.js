const express = require('express');
const bodyParser = require('body-parser');
const jwt =require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const User = require("./models.js/users");
const secret_model = require("./models.js/secret");
const {userParse,secretParse} = require("./inputEvalution");
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
app.use(bodyParser.json());



try{
mongoose.connect(process.env.MONGO_URL);
console.log("Mongo Db successFull");
}
catch(err){
    console.log(err);
}
app.get("/",(req,res)=>{
    res.send("Hello");
})
//routes for secrets
app.post('/secret/add',async(req,res)=>{
   
    const category = req.body.category;
    const secret = req.body.secret;
    const token = req.body.token;
    const user_info = jwt.decode(token);
    const user = user_info.username;
    
    const response = secretParse.safeParse({category:category, secret:secret, user:user});
    
    if(response.success){
    const check = await secret_model.findOne({user:user});
    if(!check){
    try{
     await secret_model.create({category:category, secret:secret, user:user});
     res.status(200).send("secret added successfully");
    }
    catch(err){
        console.log(err);
        res.status(404).json({"msg ": " secret adding is Failure !! trying again"});
    }
   }
   else{
    res.status(404).send("You already posted a secret...kindly delete it to post new one");
   }
}
else{
    res.status(404).send("Input Validation UnsuccessFull.. make sure to enter email and other fields correct");
}

});

app.post('/secret/remove',async(req,res)=>{
    const token = req.body.token;
    const user_info = jwt.decode(token);
    const user = user_info.username;
    try{
    await secret_model.findOneAndDelete({user:user});
    res.status(200).send("deletion success")
    }
    catch(err){
        console.log(err);
        res.status(404).send("Internal Error while deleting..please try again");
    }


});
app.post('/secret/show/category',async(req,res)=>{
    try{
     const category = req.body.category;
     const all_data = await secret_model.find({category:category});
     const data = [];
     for(let i = 0; i < all_data.length; i++){
        data.push(all_data[i].secret);
     }
     res.status(200).send(data);

    }
    catch(err){
        console.log(err);
        res.status(404).send("Internal Error while fetching..please try again");
    }

});
app.post('/secret/show/user',async(req,res)=>{
    try{
        const token = req.body.token;
        
        const user_info = jwt.decode(token);
        
        const user = user_info.username;
        const all_data = await secret_model.find({user:user});
        const data = [];
        for(let i = 0; i < all_data.length; i++){
           data.push({category: all_data[i].category,secret:all_data[i].secret});
        }
        res.status(200).send(data);
   
       }
       catch(err){
           console.log(err);
           res.status(404).send("Internal Error while fetching..please try again");
       }
   

});

app.get('/secret/categories',async(req,res)=>{
    try{
const info = new Map();
const details = await secret_model.find({});
for(let i = 0; i < details.length;i++){
    if(!info.has(details[i].category)){
        info.set(details[i].category,'1');
        
    }
}
let data= [];
info.forEach((value, key) => {
    data.push(key);
  });
  //console.log(data);
res.status(200).send(data);
}catch(e){
    console.log(e);
}
});

//users authentication routes


app.post('/user/signup',async(req,res)=>{
    const user = req.body.user;
    const password = req.body.password;
    console.log(req.body);

    const credentials = userParse.safeParse({user:user,password:password});

    if(credentials.success){
        try{
       
            const check = await User.findOne({email:user});
            if(!check){
               const token = jwt.sign({username:user},process.env.JWT_SECRET);
               await User.create({email:user,password:password});
               res.status(200).send(token);
            }
            else{
                res.status(500).send("user already exists..please login");
            }

        }
        catch(err){
            
            res.status(500).send("Internal error");
        }

    }
    else{
        res.status(404).send("Input Validation Unsuccessfull..kindly check email again");
    }

});

app.put('/user/update',async(req,res)=>{

    const user = req.body.user;
    const password = req.body.password;
    const credentials = userParse.safeParse({user:user,password:password});
   
    if(credentials.success){
        try{
            await User.findOneAndUpdate({email:user},{password:password});
            res.status(200).send("User added Successfully");

        }
        catch(err){
            console.log(err);
            res.status(500).send("Internal error");
        }

    }
    else{
        res.status(404).send("Input Validation Unsuccessfull..kindly check email again");
    }

});
app.post('/user/login',async(req,res)=>{
const user = req.body.user;
const password = req.body.password;
try{
 const check = await User.findOne({email:user});
 if(check){
    if(password == check.password){
        const token = jwt.sign({username:user},process.env.JWT_SECRET);
        res.status(200).send(token);
    }
    else{
        res.status(400).send("Wrong Password entered...please check again");
    }

 }
 else{
    res.status(404).send("No Account Found...Please Signup");
 }
}
catch(e){
    console.log(e);
    res.status(500).send("internal login error");
}



});

















const PORT = process.env.PORT || 5000;

app.listen(PORT);