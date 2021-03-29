import { Context } from '../context'

export const isAuth = ({ req, connection }: Context, requiresAuth = true) => {
  if (req && req.user) {
    return req.user.id
  } else if (req && req.session.userId) {
    return req.session.userId
  }

  if (connection && connection.context.req.session.passport) {
    return connection.context.req.session.passport.user
  } else if (connection && connection.context.req.session.userId) {
    return connection.context.req.session.userId
  }

  if (requiresAuth) {
    throw new Error('Authentication required.')
  }

  return
}
