import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/User.model.js'
import Channel from '../models/Channel.model.js'
import Message from '../models/Message.model.js'
import options from '../config.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Express routs')
})

router.get('/api/v1/test/cookies', (req, res) => {
  const token = '123456'
  res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48, path: '/' })
  res.json({ status: 'ok' })
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
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 48,
      path: '/',
      httpOnly: true,
      sameSite: 'none'
    })
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
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 48,
      path: '/',
      httpOnly: true,
      sameSite: 'none'
    })
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

router.get('/api/v1/channel', auth(), async (req, res) => {
  try {
    const { _id } = req.user
    const channel = await Channel.find({ userList: _id })
    res.json(channel)
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

router.get('/api/v1/channels', auth(), async (req, res) => {
  try {
    const { _id } = req.user
    const channels = await Channel.find()
    const channel = channels.filter((it) => !it.userList.includes(_id))
    res.json(channel)
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

router.post('/api/v1/channel', auth(), async (req, res) => {
  try {
    const { _id } = req.user
    const { name, description } = req.body

    const channel = new Channel({
      userList: _id,
      name,
      description
    })

    const creator = await User.findById(_id)

    if (creator) {
      if (!creator.channels) {
        creator.channels = [channel._id]
      } else if (!creator.channels.includes(channel._id)) {
        creator.channels.push(channel._id)
      }
      await creator.save()
    }

    await channel.save()
    res.json(channel)
  } catch (err) {
    res.json({ status: 'error', message: err.message })
  }
})

router.patch('/api/v1/channel/:channelId', auth(), async (req, res) => {
  try {
    const { _id } = req.user
    const { channelId } = req.params
    const { name } = req.body
    if (name) {
      const userIds = await User.find({ name: { $in: name } }, '_id')
      await Channel.findOneAndUpdate(
        { _id: channelId },
        { $push: { userList: { $each: userIds } } },
        { new: true }
      )
    } else {
      await Channel.findOneAndUpdate(
        { _id: channelId },
        { $push: { userList: _id } },
        { new: true }
      )
    }
    const channel = await Channel.find({ userList: _id })
    res.json(channel)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

router.get('/api/v1/messages/:channelId', auth(), async (req, res) => {
  try {
    const { channelId } = req.params
    const listOfMessages = await Message.find({ channelId })
    const SortedByDate = listOfMessages.sort((a, b) => a.time - b.time)
    res.json(SortedByDate)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

router.post('/api/v1/messages', auth(), async (req, res) => {
  const { message, channelId, userId, time } = req.body
  const { name } = await User.findById({ _id: userId })
  const newMessage = new Message({
    message,
    channelId,
    userId,
    time,
    name
  })
  newMessage.save()
  res.json(newMessage)
})

router.get('/api/v1/users', auth(), async (req, res) => {
  const allUsers = await User.find({})
  res.json(allUsers)
})

export default router
