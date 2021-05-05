import express from 'express'

import { isAuthenticated } from './_middleware'
import { notes } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.get('/create', async (req, res) => {
  const { name, description } = req.query
  await notes.create(req.decode.sub, name, description)
  res.json({})
})

router.get('/exists', async (req, res) => {
  const exists = await notes.exists(req.decode.sub, req.query.name)
  res.json(exists)
})

router.get('/delete', async (req, res) => {
  await notes.delete(req.decode.sub, req.query.name)
  res.json({})
})

router.get('/all', async (req, res) => {
  const [all] = await notes.all(req.decode.sub)
  res.json({ all })
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
  const { name, offset } = req.query
  const page = await notes.open(req.decode.sub, name, offset)
  res.json(page)
})

module.exports = router
