const router = require('express').Router()

const User = require('../Models/user')
const bcrypt = require('bcryptjs')


//SignUp

router.post("/register", async (req, res) => {
    try {

        const { email, password, username } = req.body;
        const existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            return res.status(200).json({
                message: "user Already Exist",
            })
        }
        const hashpassword = bcrypt.hashSync(password)
        const user = new User({ email, password: hashpassword, username });
        await user.save().then(() => {
            res.status(200).json({ message: 'SignUp SuccessFully', user: user })
        })


    } catch (error) {
        // res.status(200).json({ message: 'User Already Exist' })

    }

    //Login



})
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ message: 'Please Sign Up First' })
        }
        const passwordCompare = bcrypt.compareSync(req.body.password, user.password)
        if (!passwordCompare) {
            res.status(400).json({ message: 'Password is Not Correct' })
        }

        const { password, ...others } = user._doc
        res.status(200).json({ message: "Login SuccessFully", others })
    } catch (error) {
        res.status(400).json({ message: 'User Already Exist' })
    }
})


module.exports = router