import express from 'express'

import * as gcp from '../lib/gcp'

const router = express.Router()

router.get('/text-to-speech', async (req, res) => {
  const file = await gcp.tts(req.query.text)
  res.json({ file })
})

module.exports = router
