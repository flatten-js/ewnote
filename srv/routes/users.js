import express from 'express'

import { isAuthenticated } from './_middleware'
import { users } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.get('/profile', async (req, res) => {
  const profile = await users.find(req.decode.sub)
  res.json(profile)
})

module.exports = router
