const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    
    return  {
        
        postLogin(req, res, next) {
            
            const { username, password } = req.body
            // validate request
            if(!username || !password) {
                return res.send('All fields are required')
            }

            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    return next(err)
                }

                if(!user) {
                    return res.send('Something went wrong')
                }

                req.logIn(user, (err) => {
                    if(err) {
                        return next(err)
                    }

                    return res.send('Logged in successfully')
                })
            })(req, res, next)
        },   

        async postRegister(req, res) {
            const { username, email, password } = req.body
            // validate request
            if(!username || !email || !password) {
                return res.send('All fields are required')
            }

            //Check if email exists
            try{
                User.exists({ email: email }, (err, result) => {
                    if(result) {
                        return res.send('email already taken')
                    }
                })
            }catch(err) {
                console.log(err)
            }

            //Check if username exists
            try {
                User.exists({ username: username }, (err, result) => {
                    if(result) {
                        return res.send('username already taken')
                    }
                })
            }catch(err) {
                console.log(err)
            }
            
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            
            // Create a user
            const user = new User({
                username,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {

                return res.send(`Successfully created !! <br> ${user}`)
            }).catch(err => {
                return res.send('Something went wrong')
            })

        },

        async forgetPass(req, res) {
            const { username, email, newPass } = req.body;

            const user = await User.findOne({username, email})

            const hashedPassword = await bcrypt.hash(newPass, 10)
            user.password = hashedPassword;
            user.save().then(() => {
                res.send("password updated !!")
            }).catch(err =>
                console.log(err) 
            )
        }

     }
}


module.exports = authController