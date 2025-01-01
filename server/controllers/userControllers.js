const { User } = require("../models/userModel")
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token")
const jwt = require('jsonwebtoken')
const { response } = require("express")

async function userSignup(req, res, next) {
    try {
        console.log('Router: signup')

        const { name, email, password, mobile, profilePic } = req.body

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({ message: "All the fields are required" })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "User already exist" })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        console.log('password :>> ', password);
        console.log('hashedPassword :>> ', hashedPassword);

        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword,
            profilePic
        })

        await newUser.save()

        const token = generateToken(newUser, 'user')
        console.log('token :>> ', token);

        res.cookie('token', token, {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        })

        res.status(200).json({ message: "User Created Successfull" })

    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' })
    }
}

async function userLogin(req, res, next) {
    try {
        console.log('Router: login')

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'all the fiels require' })
        }

        const userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ message: 'user does not exist' })
        }

        console.log('userExist :>> ', userExist);

        const hashedPassword = userExist.password
        const isMatch = await bcrypt.compare(password, hashedPassword)

        if (!isMatch) {
            return res.status(404).json({ message: 'incorrect password' })
        }

        const token = generateToken(userExist, 'user')
        res.cookie("token", token, {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        })

        res.send({ message: 'login successful' })

    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' })
    }
}

async function userProfile(req, res, next) {
    try {
        console.log('Router: user profile')

        const userId = req.user.id
        console.log('userId :>> ', userId);

        const userProfile = (await User.findOne({ _id: userId }).select('-password'))

        if (!userProfile) {
            return res.status(401).json({ message: 'User not found' })
        }
        
        res.status(200).json({ message: 'user login successfull', data: userProfile })

    } catch (error) {
        console.log('error.message :>> ', error.message);
        res.status(error.statusCode || 500).json({ message: error.message || 'internal server error' })
    }
}

async function userLogout(req, res, next) {
    try {
        console.log('Router: user logout')

        res.clearCookie('token', {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        });

        res.status(200).json({ message: 'user logout successfully' })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.statu(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function userCheck(req, res, next) {
    try {
        console.log('Router: user check')
        console.log('req.user :>> ', req.user);

        const userId = req.user.id
        const userData = await User.findById(userId).select('-password');

        console.log('userId :>> ', userId);
        console.log('userData :>> ', userData);

        res.status(200).json({ message: 'user checked', data: userData })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function userResetPassword(req, res, next) {
    try {
        console.log('Router: user reset passoword')

        const userId = req.user.id
        const userExist = await User.findOne({ _id: userId })
        const { currentPassword, resetPassword } = req.body

        if (!userExist) {
            return res.status(400).json({ message: 'user does not exist'})
        }

        if (!currentPassword || !resetPassword) {
            return res.status(400).json({ message: 'both fields are required' })
        }

        if (currentPassword === resetPassword) {
            return res.status(400).json({ message: 'reset password must be diffenrent from current password' })
        }

        console.log('userExist :>> ', userExist);
        const hashedPassword = userExist.password

        const isMatch = await bcrypt.compare(currentPassword, hashedPassword)

        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' })
        }

        const saltRounds = 10
        const hashedResetPassword = await bcrypt.hash(resetPassword, saltRounds)

        userExist.password = hashedResetPassword

        await userExist.save()

        res.status(200).json({ message: 'reset password successfully' })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = { userSignup, userLogin, userProfile, userLogout, userCheck, userResetPassword }