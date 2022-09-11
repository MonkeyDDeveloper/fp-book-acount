interface IUser {
    id:string,
    name:string,
    email:string,
    password: string
}
interface IBook {
    id: string,
    title:string,
    author:string,
    description:string,
    releaseDate:string
}
type UsersBooks = [string, IBook[]][]
interface IFindUser {
    found: boolean,
    user: IUser | null
}
enum ENVs {
    dev = 'dev',
    prod = 'prod',
    test = 'test'
}
export {IUser, IBook, UsersBooks, ENVs, IFindUser}