import { Request } from 'express';

export const isAuth = (req: Request, requiresAuth = true) => {
  if (req.user) {
    return req.user.id
  }

  if (requiresAuth) {
    throw new Error('Authentication required.')
  }
  
  return
}