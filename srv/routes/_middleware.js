import jwt from './auth/_jwt'

export const isAuthenticated = (req, res, next) => {
  const error = msg => res.send(401, msg)
  const { authorization } = req.headers

  if (!authorization) return error('No authentication in request header')

  const [scheme, token] = authorization.split(' ')
  if (scheme != 'Bearer') return error('No token for bearer scheme')

  jwt.verify(token, (err, decode) => {
    if (err) return error(err.message)
    req.decode = decode
    next()
  })
}
