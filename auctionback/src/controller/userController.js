import userModel from '../model/usersModel.js'
import bcrypt from 'bcrypt'

import { validationResult } from 'express-validator'
import { generateToken, removeToken, saveToken } from './tokenController.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }

    const { name, password } = req.body;

    const isExist = await userModel.findOne({ name })
    if (isExist) {
      return res.status(409).send("user already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const result = await userModel.create({ name, passwordHash });

    const { accessToken, refreshToken } = generateToken(result._id)
    await saveToken(result._id, refreshToken)


    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true
    })
    res.status(201).json({
      accessToken,
      refreshToken,
      name
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'registration failed'
    })
  }
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ name: req.body.name })
    console.log('user: ', user)
    if (!user) {
      return res.status(404).json({
        msg: 'User not found'
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
    if (!isValidPass) {
      return req.status(404).json({
        msg: 'Wrong login or password'
      })
    }

    const { accessToken, refreshToken } = generateToken(user._id)
    await saveToken(user._id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true
    })
    res.status(200).json({
      accessToken,
      refreshToken,
      name: user.name
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Authorization failed'
    })
  }
};

export const logout = async (req, res) => {
  try {
    console.log('cookie: ', req.cookies)
    const { refreshToken } = req.cookies
    const token = await removeToken(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (error) {
    console.log(error)
  }
}

export const users = async (req, res) => {
  try {
    const users = await userModel.find()
    res.json({ users })
  } catch (error) {
    console.log(error)
  }
}

// export const refresh = async (req, res) => {
//   try {
//     const { refreshToken } = req.cookies

//     await saveToken(user._id, refreshToken)

//     res.cookie('refreshToken', refreshToken, {
//       maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true
//     })
//     res.status(200).json({
//       accessToken,
//       refreshToken,
//       name: user.name
//     });
//   } catch (error) {

//   }
//  }
