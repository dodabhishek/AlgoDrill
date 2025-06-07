import jwt from 'jsonwebtoken';

export const generatetoken = (userId, res)=>{
    // creates a json web tokenwith payload , secret key , expire date
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "7d",
    })
    // seting a cookie in user response 
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // how long cookie is valid
        httpOnly:true,                  // client side js accessing the cookiem
        sameSite:"strict",              // adds protection against cros site request forger csrf

        secure : process.env.NODE_ENV !== "development", // ensure cookie is sent only over https when in production
    })
    return token ; // send token in a json response along
}