import express from 'express'

import { isAuthenticated } from './_middleware'
import { pages } from '~srv/lib/store'

const router = express.Router()

router.use(isAuthenticated)

router.post('/filing', async (req, res) => {
  const { id, page } = req.body
  await pages.filing(id, page)
  res.json({})
})

module.exports = router
