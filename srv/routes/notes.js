import express from 'express'

import { isAuthenticated } from './_middleware'

import { notes } from '../lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.post('/add', async (req, res) => {
  await notes.add(req.decode.sub, req.body.page)
  res.json({})
})

module.exports = router
