exports.verification = (req,res, next) => {
    try {
        let user = req.user
        console.log(user)
        if(!user || !user.verified) return res.status(401).send({message:"Please Authenticate Your email"})
        next()
        
    } catch (error) {
        return res.status(500).send(error)
    }
}