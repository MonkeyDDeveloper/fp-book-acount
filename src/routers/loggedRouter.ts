import {Router} from 'express';
import {LoggedController} from '../controllers/loggedController';
import {isLogged} from '../middlewares/middlewares'
const LController = new LoggedController()
const loggedRouter = Router();

loggedRouter.get('/', isLogged, LController.renderLoggedIndex)
loggedRouter.get('/add-book', isLogged, LController.renderAddBook)
loggedRouter.get('/edit-book/:bookid', isLogged, LController.renderUpdateABook)
loggedRouter.put('/edit-book', isLogged, LController.updateABook)
loggedRouter.post('/add-book', isLogged, LController.addNewBook)
loggedRouter.delete('/delete-book/:bookid', isLogged, LController.deleteABook)
loggedRouter.delete('/logout', isLogged, LController.logout)

export {loggedRouter}