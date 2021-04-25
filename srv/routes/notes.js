import express from 'express'

import { isAuthenticated } from './_middleware'
import { notes } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.get('/size', async (req, res) => {
  const size = await notes.size(req.decode.sub)
  res.json(size)
})

router.get('/daily', async (req, res) => {
  const [daily] = await notes.daily(req.decode.sub)
  res.json({ daily })
})

router.post('/add', async (req, res) => {
  await notes.add(req.decode.sub, req.body.page)
  res.json({})
})

router.get('/open', async (req, res) => {
  const page = await notes.open(req.decode.sub, req.query.offset)
  res.json(page)
})

module.exports = router
