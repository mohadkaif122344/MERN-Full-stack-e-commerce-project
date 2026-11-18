import jwt from 'jsonwebtoken'

export const genToken = async (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
    return token
}

export const genToken1 = async (email)=>{
    const token = jwt.sign({email}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })
    return token
}