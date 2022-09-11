import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {IUser} from '../types/myTypes'
import {users} from '../index';
class IndexController {
    renderIndex(req:Request, res:Response):void {
        res.render('index', {
            title: 'Save your books | Login',
            message: req.flash('message')
        })
    }
    renderRegister(req:Request, res:Response):void {
        res.render('register', {
            message: req.flash('error')
        })
    }
    async register(req:Request, res:Response):Promise<void> {
        try {
            if(users.find( user => user.email === req.body.email )) {
                req.flash('error', 'El usuario ya se encuentra registrado')
                res.redirect('/register')
            }
            else {
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const newUser:IUser = {
                    name: req.body.name, 
                    email: req.body.email, 
                    id: Date.now().toString(), 
                    password: hashPassword
                }
                users.push(newUser)
                req.flash('message', 'Usuario registrado con éxito')
                res.redirect('/')
            }
        }
        catch {
            req.flash('error', 'Hubo un error registrando la cuenta')
            res.redirect('/register')
        }
    }
}
export {IndexController}
