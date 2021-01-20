import jwt from 'jsonwebtoken'
import { Request } from '../context'

export const getUserId = (request: Request, requireAuth = true) => {
  const header = request.req.headers.authorization

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = <{userId: string}>jwt.verify(token, process.env.JWT_SECRET)
    
    return decoded.userId
  }

  if (requireAuth) {
    throw new Error('Authentication required.')
  }

  return
}