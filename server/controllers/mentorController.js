const { Mentor } = require("../models/mentorModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

async function mentorSingnup(req, res, next) {
    try {
        console.log('Router: Signup')

        const { name, email, roll, password, course } = req.body

        if (!name, !email, !roll, !password) {
            return res.status(400).json({ message: 'all fields are require' })
        }

        const existMentor = await Mentor.findOne({ email })

        if (existMentor) {
            return res.status(400).json({ message: 'mentor elready exist' })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        console.log('hashedPassword :>> ', hashedPassword);
        console.log('password :>> ', password);

        const newMentor = new Mentor({
            name,
            email,
            password: hashedPassword,
            roll,
        })

        console.log('newMentor :>> ', newMentor);

        const token = generateToken(newMentor, 'mentor')
        res.cookie('token', token, {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        })

        await newMentor.save()
        res.json({ message: 'mentor signup successful' })

    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function mentorLogin(req, res, next) {
    try {
        console.log('Router: mentor login')

        console.log('req.body :>> ', req.body);
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        const userExist = await Mentor.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ message: 'mentor does not exist' })
        }

        const hashedPassword = userExist.password
        console.log('hashedPassword :>> ', hashedPassword);

        const isMatch = await bcrypt.compare(password, hashedPassword)

        if (!isMatch) {
            return res.status(400).json({ message: 'incorrect password' })
        }

        const token = generateToken(userExist, 'mentor')
        
        res.cookie('token', token, {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        })

        res.json({ message: 'mentor login successful', data: userExist })

    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function mentorProfile(req, res, next) {
    try {
        console.log('Router: mentor profile')

    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function mentorLogout(req, res, next) {
    try {
        console.log('Router: mentor logout')
        
        res.clearCookie('token', {
            sameSite: 'None',
            secure: true,
            httpOnly: true
        })
        
        res.json({ message: 'mentor logout successful' })
        
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function mentorResetPassword(req, res, next) {
    try {
        console.log('Router: mentor reset password')

        const { currentPassword, resetPassword } = req.body

        if (!currentPassword || !resetPassword) {
            return res.status(400).json({ message: 'all fields are required' })
        }

        if (currentPassword === resetPassword) {
            return res.status(400).json({ message: 'new password must not be equal to current password' })
        }

        const mentorId = req.mentor.id 

        const mentorExist = await Mentor.findOne({ _id: mentorId })

        const hashedPassword = mentorExist.password
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword)

        console.log('isMatch :>> ', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'incorrct password' })
        }

        const saltRounds = 10
        const hashedResetPassword = await bcrypt.hash(resetPassword, saltRounds)

        mentorExist.password = hashedResetPassword

        await mentorExist.save()
        
        res.json({ message: 'password reset successfully' })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

async function mentorCheck(req, res, next) {
    try {
        console.log('Router: mentor check')

        const mentorId = req.mentor.id
        const mentorData = await Mentor.findById(mentorId).select('-password')
        
        console.log('mentorId :>> ', mentorId);
        console.log('mentorData :>> ', mentorData);
        
        res.json({ message: 'mentor checked', data: mentorData })
    } catch (err) {
        console.log('err.message :>> ', err.message);
        res.status(err.statusCode || 500).json({ message: err.message || 'internal server error' })
    }
}

module.exports = { mentorSingnup, mentorLogin, mentorLogout, mentorProfile, mentorResetPassword, mentorCheck  }