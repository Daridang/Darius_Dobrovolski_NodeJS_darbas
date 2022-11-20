import { validateAccessToken } from "../controller/tokenController.js"

export const auth = function (req, res, next) {
  try {
    console.log(req.headers, req.body)
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(403).json({
        msg: 'Not Authorized'
      })
    }

    const accessToken = authHeader.split(' ')[1]
    if (!accessToken) {
      return res.status(403).json({
        msg: 'Not Authorized'
      })
    }

    const userData = validateAccessToken(accessToken)

    console.log('userData: ', userData)
    if (!userData) {
      return next('no user data')
    }

    req.userId = userData._id

    return next()
  } catch (error) {
    console.log(error)
  }
}