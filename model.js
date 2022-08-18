const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    name:String,
    struggling_with_sleep:String,
    time_to_bed:String,
    time_to_getup:String,
    how_many_hours_sleep:Number
})
module.exports=mongoose.model("user",userSchema)