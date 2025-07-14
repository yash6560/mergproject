const authUser = require('../models/auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const authMe = async (req, res) => {
    try {
        return res.status(200).json({success: true, user : req.user});
    } catch (error) {
        console.error(`Error during user authentication: ${error.message}`);
        return res.status(500).json({ message: 'authentication Internal server error' }); 
    }
}

const userSignup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if(!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Email format validation using regex
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const userExists = await authUser.findOne({email});
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await authUser.create({
            fullName,
            email,
            password: hashPassword,
        });
        

        return res.status(201).json({ message: 'User created successfully', success:true});

    } catch (error) {
        console.error(`Error during user signup: ${error.message}`);
        return res.status(500).json({ message: 'Sign Up Internal server error' });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await authUser.findOne({email});
        if(!userExists) {
            return res.status(400).json({ message: 'Please Enter Valid Credentials' });
        }

        const checkPassword = await bcrypt.compare(password, userExists.password);
        if(!checkPassword){
            return res.status(400).json({ message: 'Please Enter Valid Credentials' });
        }

        await generateToken(userExists._id, res);
        
        return res.status(200).json({ message: "Login successful", success: true, user: {
    _id: userExists._id,
    fullName: userExists.fullName,
    email: userExists.email,
  }
            });

    } catch (error) {
        console.error(`Error during user Login: ${error.message}`);
        return res.status(500).json({ message: 'Login Internal server error' });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(`Error during user Logout: ${error.message}`);
        return res.status(500).json({ message: 'Logout Internal server error' });
    }
};

module.exports = { userSignup, userLogin, userLogout, authMe };