import express from 'express'

import passport from 'passport'
const GoogleStrategy = require('passport-google-oauth20').Strategy

import jwt from './_jwt'
import { users } from '../../lib/store'

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}

passport.use(
  new GoogleStrategy(config, async (accessToken, refreshToken, profile, cb) => {
    const user = await users.create(profile._json)
    cb(null, user)
  })
)

const router = express.Router()

router.get('/', passport.authenticate('google', { session: false, scope: ['profile'] }))

router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
  res.cookie('token', jwt.generate(req.user.id), {
    maxAge: 60 * 60 * 1000,
    // secure: true
  })

  res.redirect('http://localhost:8080/')
})

module.exports = router
