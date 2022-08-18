const jwt=require("jsonwebtoken")

const auth=async function(req,res,next){
    try{
        let token = req.headers["X-Api-Key"];
        if (!token) {
          token = req.headers["x-api-key"];
        }
        
        if(!token) return res.status(403).send({status:false,msg:"Token is required"})
        
        let decodedToken =jwt.verify(token, 'assignment')//error 500
        
        if(!decodedToken){
            return res.status(403).send({status:false,message:"Invalid authentication"})
        }
        let exptoken=decodedToken.exp
        if((exptoken*1000)<Date.now())return res.status(400).send({status:false,msg:"token exp"})
        req.user=decodedToken.userId//error 400
            
            next()
    }
    
catch(err){
    return res.status(500).send({msg:err.message})
}
}

module.exports.auth=auth