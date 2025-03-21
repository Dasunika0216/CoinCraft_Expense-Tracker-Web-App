import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'

//login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success: false, messege: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch){                                                                      // crete token
            //crete toekn
            res.json({success: true, messege: "User logged in successfully"});
        }
        else {
            res.json({success: false, messege: "Invalid password"});
        }
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, messege: error.messege});
    }
}

//register user
const registerUser = async (req, res) => {

}

export {loginUser, registerUser};