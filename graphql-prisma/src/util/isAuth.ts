import { Request } from 'express';

export const isAuth = (req: Request) => {
  if (!req.user) {
    throw new Error('Authentication required.')
  }
  return req.user.id
}