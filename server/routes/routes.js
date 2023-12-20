import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User.model.js'
import options from '../config.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Express routs')
})

router.get('/api/v1/test/user-info', auth(), async (req, res) => {
  res.json({ status: '123' })
})

router.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, options.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, options.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

router.post('/api/v1/login', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)

    const payload = { uid: user.id }
    const token = jwt.sign(payload, options.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

router.post('/api/v1/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isUsedEmail = await User.findOne({ email })

    if (isUsedEmail) {
      res.json({ status: 'error' })
      throw Error('Email is already used')
    }
    const user = new User({
      email,
      password,
      name
    })
    await user.save()

    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

export default router
