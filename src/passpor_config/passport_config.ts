import {PassportStatic } from 'passport'
import { IFindUser } from '../types/myTypes';
import bcrypt from 'bcrypt'
const LocalStrategy = require('passport-local');
function initializePassport (passport:PassportStatic, findUser:Function) {
    const authUser = async (email:string, password:string, done:Function) => {
        try {
            const userFound:IFindUser = findUser(email)
            if(!userFound.found) 
                return done(null, false, {message: 'No se ha encontrado al usuario en la base de datos'})
            if(!(await bcrypt.compare(password, userFound.user!.password))) 
                return done(null, false, {message: 'La clave que ha ingresado es incorrecta'})
            return done(null, userFound.user)
        }
        catch (err) {
            done(err, false)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authUser))
    passport.serializeUser((user, done) => {
        return done(null, user.email)
    })
    passport.deserializeUser((email, done) => {
        const userFound:IFindUser = findUser(email)
        return done(null, userFound.user)
    })
}
export {initializePassport}