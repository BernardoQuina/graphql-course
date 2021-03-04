import { Context } from '../context'

export const isAuth = (req: Context['req'], requiresAuth = true) => {
  if (req.user) {
    return req.user.id
  } else if (req.session.userId) {
    return req.session.userId
  }

  if (requiresAuth) {
    throw new Error('Authentication required.')
  }
  
  return
}