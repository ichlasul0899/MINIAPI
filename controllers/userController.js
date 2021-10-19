const {User} = require('../models/user')
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');


class UserController {
    static async login(req,res,next){

        //TODO: Membuat function dengan inputan email dan password, dan mengembalikan token 

        //* Email dan password dari user
        let {email,password} = req.body
        try {
            //* Check Apakah user sudah terdaftar
            const user_exist = await User.findOne({email})

            //* Check apakah password user benar
            if (user_exist && comparePassword(password, user_exist.password)){
                const payload = {
                    email
                }
                const token = signToken(payload)

                //* Mengembalikan token 
                res.status(200).json({
                    token,
                    message: `Success login. Hello ${email}` 
                })
            }

        } catch(error){

            //* Mengembalikan Message Error 
            res.status(400).json({
                message: 'Error Login User',
            })
        }
    }

    static async register(req, res, next){

        //TODO: Membuat function untuk menambahkan user ke database dengan inputan email dan passwor, lalu mengembalikan pesan sukses menambahkan user

        //* Sistem menerima email dan password dari user
        let {email, password} = req.body

        //* Sistem melakukan hash password
        const new_password = hashPassword(password)

        try{

            //* Menambahkan user ke database
            const new_user = await User.create({
                email,
                password: new_password
            })

            //* Pengecekan proses penambahan data ke database
            if(new_user){

                //* Jika berhasil maka akan mengembalikan pesan sukses
                res.status(201).json({
                    message: 'Success Register User'
                })
            } 
        } catch(error){

            //* Jika ada proses gagal maka sistem akan mengembalikan pesan error
            res.status(400).json({
                message: 'Error Register User',
                error
            })
        }
    }

    static async readUsers(req,res,next){

        //TODO : Membuat function untuk menampilkan data seluruh user

        try{

            //* Query seluruh user ke database
            const users = await User.find({})

            if (users){

                //* Mengembalikan data seluruh user
                res.status(200).json({
                    message: 'Show all user',
                    users,
                })
            }
        } catch(error){

            //* Mengembalikan pesan error
            res.status(400).json({
                message: 'Error Showing User',
            })
        }
    }
}

module.exports = UserController;