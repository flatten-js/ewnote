import express from 'express'

import { isAuthenticated } from './_middleware'
import { notes } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.get('/count', async (req, res) => {
  const [count] = await notes.count(req.decode.sub)
  res.json({ count })
})

router.post('/add', async (req, res) => {
  await notes.add(req.decode.sub, req.body.page)
  res.json({})
})

module.exports = router
