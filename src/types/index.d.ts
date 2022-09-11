import {ENVs, IUser} from './myTypes'
// import {Request} from 'express'
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: (Array<string>|string),
      PORT: (number|string),
      ENV: ENVs
    }
  }
  namespace Express {
    interface User extends IUser {}
  }
}
export {};