import userModel from "../model/userModel.js"

export const getUser = async (req ,res)=>{
    try {
      const user = await userModel.findById(req.userId).select("-password") 
      if (!user) {
        return res.status(404).json({success:false, message:"user not found"})
      }
      return res.status(200).json({success: true, message:"user found successfully", user})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}


export const getAdmin = async (req ,res)=>{
    try {
        const adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({success:false,message:"Admin not found"})
        }
        return res.status(200).json({success:true, message:"admin login successfully",email:adminEmail,role:"admin"})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}