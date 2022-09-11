import {Request, Response} from 'express'
function isLogged(req:Request, res:Response, next:Function) {
    if(req.isAuthenticated()) return next()
    return res.redirect('/')
}
function isNotLogged(req:Request, res:Response, next:Function) {
    if(req.isAuthenticated()) return res.redirect('/logged')
    return next()
}
export {isLogged, isNotLogged}