import express from 'express'

export default (app, http) => {
  app.use(express.json())
  app.use('/api/gcp', require('./routes/gcp'))
}
