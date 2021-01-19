import jwt from 'jsonwebtoken'
import { Request } from '../context'

export const getUserId = (request: Request) => {
  const header = request.req.headers.authorization

  if (!header) {
    throw new Error('Authentication required.')
  }

  const token = header.replace('Bearer ', '')
  const decoded = <{userId: string}>jwt.verify(token, process.env.JWT_SECRET)

  return decoded.userId
}