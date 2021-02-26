import jwt from 'jsonwebtoken'
import { Request } from 'express'

export const getUserId = (req: Request, requireAuth = true) => {
  const header = req.headers.authorization

    console.log(header)

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = <{ userId: string }>(
      jwt.verify(token, process.env.JWT_SECRET)
    )

    return decoded.userId
  }

  if (requireAuth) {
    throw new Error('Authentication required.')
  }

  return
}
