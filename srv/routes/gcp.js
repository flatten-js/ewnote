import express from 'express'

import { isAuthenticated } from './_middleware'
import * as gcp from '~srv/lib/gcp'

const router = express.Router()

router.use(isAuthenticated)

router.get('/text-to-speech', async (req, res) => {
  const file = await gcp.tts(req.query.text)
  res.json({ file })
})

module.exports = router
