import express from 'express'

import * as gcp from '../lib/gcp'
import { isAuthenticated } from './_middleware'

const router = express.Router()

router.use(isAuthenticated)

router.get('/text-to-speech', async (req, res) => {
  const file = await gcp.tts(req.query.text)
  res.json({ file })
})

module.exports = router
