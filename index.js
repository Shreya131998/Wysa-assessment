const express= require("express")
const bodyParser= require("body-parser")
const mongoose= require("mongoose")
const jwt=require("jsonwebtoken")
const {auth}=require("./auth.js")
const User=require("./model.js")
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Shreya1998:1234.qwer@cluster0.gzlyp.mongodb.net/Wysa-Assignment?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.post("/",async(req,res)=>{
    try{
        if(!req.body){
            return res.status(400).send({msg:"Please enter valid credentials"})
        }
        console.log(req.body)
        let {name}=req.body; 
        let data=await User.findOne({name:name})
        if(data){
            return res.status(400).send({msg:"User already registered"})
        }
        
        let userData=await User.create(req.body)
        
        const token =jwt.sign(
            {
              userId: name
            
            },
            "assignment")
         
        return res.status(201).send({msg:userData,token:token})
        


    }
    catch(err){
        return res.status(500).send({msg:err})
    }
})

const isValidRequest = function (struggling_with_your_sleep) {
    return ["Less than 2 weeks", "More than 2 weeks", "More than 8 weeks"].indexOf(struggling_with_your_sleep) !== -1;
  };
app.put("/secondPage/:userName",auth,async(req,res)=>{
    let {struggling_with_your_sleep}=req.body;
    let {userName}=req.params
    if(!req.body){
        return res.status(400).send({msg:"Please enter data"})
    }
    let data=await User.findOne({name:userName})
    if(!data){
        return res.status(404).send({msg:"No user found"})
    }
    let user=req.user
    if(user!=userName){
        return res.status(401).send({msg:"Unauthorized access"})
    }


    
    if(!isValidRequest(struggling_with_your_sleep)){
        return res.status(400).send({msg:"Please enter only provided options"})
    }
    let updateData={
        struggling_with_sleep:struggling_with_your_sleep
    }
    let newData=await User.findOneAndUpdate({name:userName},updateData,{new:true})
    return res.status(200).send({msg:newData})
    





})
app.put("/thirdPage/:userName",auth,async(req,res)=>{
    let {time_to_bed}=req.body;
    let {userName}=req.params
    if(!req.body){
        return res.status(400).send({msg:"Please enter data"})
    }
    let data=await User.findOne({name:userName})
    if(!data){
        return res.status(404).send({msg:"No user found"})
    }
    let user=req.user
    if(user!=userName){
        return res.status(401).send({msg:"Unauthorized access"})
    }


    
    
    let updateData={
        time_to_bed:time_to_bed
    }
    let newData=await User.findOneAndUpdate({name:userName},updateData,{new:true})
    return res.status(200).send({msg:newData})
    





})

app.put("/fourthPage/:userName",auth,async(req,res)=>{
    let {time_to_getup}=req.body;
    let {userName}=req.params
    if(!req.body){
        return res.status(400).send({msg:"Please enter data"})
    }
    let data=await User.findOne({name:userName})
    if(!data){
        return res.status(404).send({msg:"No user found"})
    }
    let user=req.user
    if(user!=userName){
        return res.status(401).send({msg:"Unauthorized access"})
    }


    
    
    let updateData={
        time_to_getup:time_to_getup
    }
    let newData=await User.findOneAndUpdate({name:userName},updateData,{new:true})
    return res.status(200).send({msg:newData})
    





})
app.put("/fifthPage/:userName",auth,async(req,res)=>{
    let {how_many_hours_sleep}=req.body;
    let {userName}=req.params
    if(!req.body){
        return res.status(400).send({msg:"Please enter data"})
    }
    let data=await User.findOne({name:userName})
    if(!data){
        return res.status(404).send({msg:"No user found"})
    }
    let user=req.user
    if(user!=userName){
        return res.status(401).send({msg:"Unauthorized access"})
    }
    
    let updateData={
        how_many_hours_sleep:how_many_hours_sleep
    }
    let newData=await User.findOneAndUpdate({name:userName},updateData,{new:true})
    return res.status(200).send({msg:newData})


})
app.get("/sixthPage/:userName",auth,async(req,res)=>{
    let {userName}=req.params
    let data=await User.findOne({name:userName})
    if(!data){
        return res.status(404).send({msg:"No user found"})
    }
    let user=req.user
    if(user!=userName){
        return res.status(401).send({msg:"Unauthorized access"})
    }
    if(data.how_many_hours_sleep<8 || data.how_many_hours_sleep>8){
        return res.status(200).send({msg:"Your efficiency is 40% We'll get this up to 80% .A higher sleep means a more refreshing and energizing sleep,which can help you move into your day with a sense of lightness and ease."})
    }
    else{
        return res.status(200).send({msg:"Your efficiency is 80%. Good Keep it up"})
    }

})




app.listen(process.env.PORT || 9000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 9000))
});