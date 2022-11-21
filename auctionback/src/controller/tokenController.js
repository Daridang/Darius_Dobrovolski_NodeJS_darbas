import tokenModel from '../model/tokenModel.js'
import jwt from 'jsonwebtoken'

export const refresh = async (req, res) => {

}

export const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    console.log('validate access token: ', userData)
    return userData
  } catch (error) {
    console.log(error)
    return null
  }
}

export const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return userData
  } catch (error) {
    console.log(error)
    return null
  }
}

export const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken })
  return tokenData
}

export const generateToken = (payload) => {
  const accessToken = jwt.sign({ _id: payload }, process.env.JWT_ACCESS_SECRET, { expiresIn: '30d' })
  const refreshToken = jwt.sign({ _id: payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return {
    accessToken,
    refreshToken
  }
}

export const saveToken = async (userId, refreshToken) => {
  const tokenData = await tokenModel.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await tokenModel.create({ user: userId, refreshToken })
  return token
}