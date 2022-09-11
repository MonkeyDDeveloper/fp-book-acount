import {Router} from 'express';
import {IndexController} from '../controllers/indexController';
import {isNotLogged} from '../middlewares/middlewares'
import passport from 'passport'
const IController = new IndexController()
const indexRouter = Router();

indexRouter.get('/', isNotLogged, IController.renderIndex)
indexRouter.post('/', 
    passport.authenticate('local', {
        failureRedirect: '/', 
        successRedirect: '/logged',
        failureFlash: true
    })
)
indexRouter.get('/register', isNotLogged, IController.renderRegister)
indexRouter.post('/register', IController.register)

export {indexRouter}