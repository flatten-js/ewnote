import express from 'express'

import { isAuthenticated } from '~srv/routes/_middleware'

const router = express.Router()

router.get('/verify', isAuthenticated, (_, res) => res.send(200))

module.exports = router
