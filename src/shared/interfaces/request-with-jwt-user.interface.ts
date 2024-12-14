import { Request } from 'express'

export interface UserJwtPayload {
  id: number
  email: string

  iat?: number
  exp?: number
}

export interface RequestWithJwtUser extends Request {
  user: UserJwtPayload
}
