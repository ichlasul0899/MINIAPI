const {User} = require('../models/user')
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');


class UserController {
    static async login(req,res,next){
        let {email,password} = req.body
        try {

            const user_exist = await User.findOne({email})

            if (user_exist && comparePassword(password, user_exist.password)){
                const payload = {
                    email
                }
                const token = signToken(payload)
                res.status(200).json({
                    token,
                    message: `Success login. Hello ${email}` 
                })
            }

        } catch(error){
            res.status(400).json({
                message: 'Error Login User',
            })
        }
    }

    static async register(req, res, next){
        let {email, password} = req.body
        const new_password = hashPassword(password)
        try{
            const new_user = await User.create({
                email,
                password: new_password
            })
            if(new_user){
                res.status(201).json({
                    message: 'Success Register User'
                })
            } 
        } catch(error){
            res.status(400).json({
                message: 'Error Register User',
            })
        }
    }

    static async readUsers(req,res,next){
        try{
            const users = await User.find({})
            if (users){
                res.status(200).json({
                    message: 'Show all user',
                    users,
                })
            }
        } catch(error){
            res.status(400).json({
                message: 'Error Showing User',
            })
        }
    }
}

module.exports = UserController;