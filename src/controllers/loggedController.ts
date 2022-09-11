import { Request, Response } from 'express';
import { IBook } from '../types/myTypes';
import { usersBooks } from '../index';
class LoggedController {
    renderLoggedIndex(req: Request, res: Response): void {
        const { name, id } = req.user!
        const books = usersBooks.filter( userAndBook => userAndBook[0] == id )
        res.render('loggedIndex', {
            title: 'Your account',
            message: `Welcome ${name}`,
            userBooks: books
        })
    }
    renderAddBook(req: Request, res: Response): void {
        res.render('addNewBook', {
            title: 'Add a new book',
        })
    }
    renderUpdateABook(req: Request, res: Response): void {
        const idUser = req.user!.id
        const idBook = req.params.bookid
        const book:IBook[] = [];
        usersBooks.forEach( (userAndBook):void => {
            if(userAndBook[0] == idUser) {
                userAndBook[1].forEach( (userBook):void => {
                    if(userBook.id == idBook) {
                        book.push(userBook)
                    }
                })
            }
        })
        res.render('updateABook', {
            title: 'Update a new book',
            book
        })
    }
    addNewBook(req: Request, res: Response): void {
        const id: string = req.user!.id
        const newBook: IBook = {
            id: Date.now().toString(),
            title: req.body.title,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            description: req.body.description
        }
        if (!usersBooks.find(userAndBooks => userAndBooks[0] == id))
            usersBooks.push([id, [newBook]])
        else {
            usersBooks.some(userAndBook => {
                if (!(userAndBook[0] == id)) return false
                userAndBook[1].push(newBook)
                return true
            })
        }
        res.redirect('/logged')
    }
    deleteABook(req: Request, res: Response): void {
        const idUser: string = req.user!.id
        const idBook = req.params.bookid
        usersBooks.some( (userAndBook) => {
            if(userAndBook[0] == idUser) {
                let i = userAndBook[1].findIndex( book => book.id == idBook )
                userAndBook[1].splice(i, 1)
                return true
            }
            return false
        })    
        res.status(200).send()
    }
    updateABook(req: Request, res: Response): void {
        const idUser: string = req.user!.id
        const newDataBook: IBook = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            description: req.body.description
        }
        usersBooks.forEach( userAndBook => {
            if(userAndBook[0] == idUser) {
                const bookToUpdate = userAndBook[1].findIndex( book => book.id == newDataBook.id )
                userAndBook[1].splice(bookToUpdate, 1, newDataBook)
            }
        })
        res.redirect('/logged')
    }
    logout(req: Request, res: Response): void {
        req.logOut({ keepSessionInfo: false }, () => {
            res.redirect('/')
        })
    }
}
export { LoggedController }