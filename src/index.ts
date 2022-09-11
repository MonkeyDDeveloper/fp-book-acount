import {ENVs} from './types/myTypes'
const PROD:boolean = process.env.ENV == ENVs.prod; 
if(!PROD) {
    require('dotenv').config()
}
import express from 'express';
import path from 'path';
import session from 'express-session';
import flash from 'express-flash';
import override from 'method-override';
import {UsersBooks, IUser, IFindUser} from './types/myTypes';
import {indexRouter} from  './routers/indexRouter';
import {loggedRouter} from  './routers/loggedRouter';
import {initializePassport} from './passpor_config/passport_config';
import passport from 'passport';
const viewsPath = PROD ? path.join(__dirname, '..', '..', 'public', 'views') : path.join(__dirname, '..', 'public', 'views')
const staticPath = path.join(__dirname, 'public')
const app = express();
const users:IUser[] = [{name: 'Javier', id: '1234', email: 'q@q', password: '$2a$10$StGFGixonV1y0DEO0m7f.u6gHOU1K/yXgrfWJrbpPuB5UlFEPL4rK'}];
const usersBooks:UsersBooks = [["1234", [{id: Date.now().toString(), author: 'juan javier', description: 'descripcion', releaseDate: '2000-02-18', title: 'mi libro'}]]]
const secret:string|string[] = process.env.SECRET!;
//Initialize Passport
initializePassport(passport, (email:string):IFindUser => {
    const userFound:IUser[] = users.filter( user => user.email == email )
    if(userFound.length == 0) return {found: false, user: null}
    return {found: true, user:userFound[0]}
})
//Settings
app.set('view engine', 'pug')
app.set('views', viewsPath)
app.set('port', process.env.PORT || 3000)
//Middlewares
app.use(override('_method'))
PROD ? {} : app.use(require('morgan')('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
//Static Files
app.use('/public', express.static(staticPath))
//Routes
app.use('/', indexRouter)
app.use('/logged', loggedRouter)
//Opening the server
app.listen(3000, () => {
    console.log(`App listening on port %d`, app.get('port'))
})
export {users, usersBooks}