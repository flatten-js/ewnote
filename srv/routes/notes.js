import express from 'express'

import { isAuthenticated } from './_middleware'
import { notes } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.get('/all', async (req, res) => {
  const [all] = await notes.all(req.decode.sub)
  res.json({ all })
})

router.get('/add', async (req, res) => {
  const { name, description } = req.query
  await notes.add(req.decode.sub, name, description)
  res.json({})
})

router.get('/size', async (req, res) => {
  const size = await notes.size(req.decode.sub, req.query.name)
  res.json(size)
})

router.get('/daily', async (req, res) => {
  const [daily] = await notes.daily(req.decode.sub)
  res.json({ daily })
})

router.get('/open', async (req, res) => {
  const page = await notes.open(req.decode.sub, req.query.offset)
  res.json(page)
})

module.exports = router
