import express from 'express'
import passport from 'passport'

export default (app, http) => {
  app.use(express.json())

  app.use(passport.initialize());

  app.use('/api/auth', require('./routes/auth'))
  app.use('/api/auth/google', require('./routes/auth/google'))
  app.use('/api/user', require('./routes/user'))
  app.use('/api/gcp', require('./routes/gcp'))
}
