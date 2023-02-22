const express=require("express");
const app=express();
const path=require('path')
require("./conn")
const hbs=require('hbs')
const Register=require("./models/registers")
const port=process.env.PORT || 3000

// const staticpath=path.join(__dirname,"s");  this is used for only static part
// app.use(express.static(staticpath));
const partial_path=path.join(__dirname,"./partials")

app.set('view engine','hbs')
hbs.registerPartials(partial_path)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render('login')
})
app.get("/register",(req,res)=>{
    res.render('register')
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.post('/login',async(req,res)=>{
   try {
    const email=req.body.useremail;
    const password=req.body.userpass;

   const usermail=await Register.findOne({email:email})
   if(usermail.pass===password){
    res.status(201).render('index')
   }
   else{
    res.send('not matching')
   }
    
   } catch (error) {
    res.status(401).send("invalid data")
    
   }
})
app.post("/register",async(req,res)=>{
    try {
        const pass=req.body.pass;
        const repass=req.body.repass;
        if(pass===repass){
              const userdata=new Register(
                {
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    phone:req.body.phone,
                    pass:req.body.pass,
                    repass:req.body.repass
                }
              )
              const registerd=await userdata.save()
              res.status(201).render('index')
        }
        else{
            res.send('passwword wrong')
        }
       
    } catch (error) {
        res.status(404).send(error)
        
    }
})
app.listen(port,()=>{
    console.log("runnig at port")
})