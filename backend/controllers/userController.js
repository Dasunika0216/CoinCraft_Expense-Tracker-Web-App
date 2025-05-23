import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success: false, messege: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch){                                                                     
            const token = createToken(user._id)
            res.json({success: true, messege: "User logged in successfully", token});
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
    try {
        const {name, email, password, confirmPassword} = req.body;

        if (password !== confirmPassword){
            return res.json({success: false, messege: "Passwords do not match"});
        }

        const existsUser = await userModel.findOne({email});

        if (existsUser){
            return res.json({success: false, messege: "User already exists"});
        }

        if (!validator.isEmail(email)){
            return res.json({success: false, messege: "Please enter a valid email address"});
        }

        if (password.length < 8) {
            return res.json({success: false, messege: "Please enter a strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser  = new userModel ({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, messege: "User registered successfully", token});
    }
    catch (error) {
        console.log(error);
        res.json({success: false, messege: error.messege});
    }
}


export {loginUser, registerUser};