import jwt from 'jsonwebtoken'

const _secret = process.env.JWT_SECRET

export default {
  generate(id) {
    return jwt.sign({}, _secret, {
      expiresIn: 60 * 60,
      subject: id.toString()
    })
  },
  verify(token, cb) {
    return jwt.verify(token, _secret, cb)
  }
}
