import jwt from 'jsonwebtoken'

export const getUserId = (req: any, requireAuth = true) => {
  const header = req.headers
    ? req.headers.authorization
    : req.context.Authorization

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
