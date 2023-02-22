const randomstring = require('randomstring')
const db = require('../database/db')
const utils = require('../utils/utils')
const googleAuth = require('../utils/googleAuthenticator')
const { isAuthenticated } = require('../middleware/auth')
const {sendMail, validateConfirmationLink} = require('../utils/utils')

const register = (req, res) => {

  const user = req.body

  db.createUser({
    username: user.username,
    email: user.email,
    password: user.password,
    confirmation_code: randomstring.generate(30)
  }, function (result) {

    if (result.status === 1) {
      utils.sendMail()
      res.end(JSON.stringify({status: 1}))
    } else {
      res.end(JSON.stringify({
        status: 0,
        msg: 'EMAIL_TAKEN'
      }))
    }

  })
}

const login = (req, res) => {

  const credentials = req.body

  db.getUser({
    email: credentials.email,
    password: credentials.password
  }, function (result) {

    if (result.status === 1) {

      let data = {
        id: result.user.id,
        activated: result.user.activated
      }

      if (!result.user.activated) {
        res.end(JSON.stringify({status: 1, msg: 'INACTIVE', ...data}))
      }

      data.email = result.user.email
      data.username = result.user.username
      data.role = result.user.role
      data.g2f_enabled = result.user.g2f_enabled
      data.kyc_verified = result.user.kyc_verified

      if (result.user.g2f_enabled) {
        res.end(JSON.stringify({status: 1, ...data}))
      } else {
        const token = randomstring.generate(50)

        db.updateUser(result.user.id, {
          access_token: token
        }, function (result1) {})

        data.access_token = token
        res.end(JSON.stringify({status: 1, ...data}))
      }

    } else {
      res.end(JSON.stringify({ status: 0, msg: 'INCORRECT_ACCOUNT' }))
    }
  })
}

const g2fLogin = (req, res) => {
  const email = req.body.email, password = req.body.password, g2f_code = req.body.g2f_code

  db.getUser({email: email, password: password}, function (result) {

    if (result.status === 1) {
      let user = result.user

      if (googleAuth.checkCode(user.g2f_key, g2f_code)) {

        const token = randomstring.generate(50)

        db.updateUser(user.id, {
          access_token: token
        }, function (result1) {})

        res.end(JSON.stringify({ status: 1, access_token: token }))

      } else {
        // Incorrect G2f code
        res.end(JSON.stringify({ status: 0, msg: 'INVALID_CODE' }))
      }
    } else {
      // Invalid request
      res.end(JSON.stringify({ status: 0, msg: 'WRONG' }))
    }
  })
}

const sendForgotEmail = (req, res) => {
  const email = req.body.email

  if (!email) {
    res.end(JSON.stringify({ status: 0, msg: 'INCORRECT_EMAIL_FORGOT' }))
    return
  }

  db.getUser({email: email}, function (result) {
    if (result.status === 0) {
      res.end(JSON.stringify({ status: 0, msg: 'INCORRECT_EMAIL_FORGOT' }))
      return
    }

    const user = result.user

    db.getResetPasswordFromId(user.id, function (result) {
      if (result.status === 1) { // already existed

        db.updateResetPassword(result.resetPassword.id, {
          confirmation_link: randomstring.generate(50),
          expiration_time: new Date().getTime() + 60 * 60 * 1000
        }, function (result1) {
          if (result1.status === 1) {
            sendMail()
            res.end(JSON.stringify({ status: 1 }))
          } else {
            res.end(JSON.stringify({ status: 0, msg: 'WRONG' }))
          }
        })

      } else {
        let resetPassword = {
          admin_id: user.id,
          confirmation_link: randomstring.generate(50),
          expiration_time: new Date().getTime() + 60 * 60 * 1000
        }

        db.createResetPassword(resetPassword, function (result1) {
          if (result1.status === 1) {
            sendMail()
            res.end(JSON.stringify({ status: 1 }))
          } else {
            res.end(JSON.stringify({ status: 0, msg: 'WRONG' }))
          }
        })
      }
    })

  })
}

const validateResetPasswordLink = (req, res) => {
  const confirmation_link = req.body.confirmation_link

  validateConfirmationLink(confirmation_link, function (result) {
    res.end(JSON.stringify(result))
  })
}

const resetPassword = (req, res) => {
  const confirmation_link = req.body.confirmation_link

  validateConfirmationLink(confirmation_link, function (result) {

    if (result.status === 0 || !req.body.password) {
      res.end(JSON.stringify({ status: 0, msg: 'EXPIRED_CONFIRMATION_LINK' }))
    } else {
      db.updateUser(result.user.id, {password: req.body.password}, function (result1) {
        if (result.status === 0) {
          res.end(JSON.stringify({ status: 0, msg: 'WRONG' }))
        } else {
          res.end(JSON.stringify({ status: 1 }))
        }
      })
    }
  })

}

const activateAccount = (req, res) => {

  const confirmation_code = req.params.confirmation_code

  if (!confirmation_code) {
    res.end(JSON.stringify({status: 0}))
    return
  }

  db.getUser({confirmation_code: confirmation_code}, function (result) {
    if (!result.user) {
      res.end(JSON.stringify({status: 0}))
      return
    }

    db.updateUser(result.user.id, {confirmation_code: '', activated: 1}, function (result1) { })

    res.end(JSON.stringify(
      {
        status: 1,
        email: result.user.email,
        username: result.user.username,
        activated: 1
      }
    ))
  })
}

const enableG2f = (req, res) => {
  let user = req.body.user

  if (!user || !user.activated) {
    res.end(JSON.stringify({
      status: 0,
      msg: 'INACTIVE'
    }))
    return
  }

  if (user.g2f_enabled) {
    res.end(JSON.stringify({
      status: 0,
      msg: 'ALREADY_ENABLED_G2F'
    }))
    return
  }

  isAuthenticated(req.headers['authorization'], user, function (result) {

    if (result.status === 1) {

      const key = googleAuth.createKey()
      const qrUrl = `https://chart.googleapis.com/chart?chs=500x500&chld=M|0&cht=qr&chl=otpauth://totp/${process.env.SERVER_URL}:${user.email}?secret=${key}&issuer=${process.env.SERVER_URL}`
      db.updateUser(user.id, {g2f_key: key}, function (result) { })

      res.end(JSON.stringify({
        status: 1,
        g2f_key: key,
        qr_url: qrUrl
      }))

    } else {
      res.end(JSON.stringify({
        status: 0,
        msg: 'INCORRECT_TOKEN'
      }))
    }
  })
}

const validateG2fLogin = (req, res) => {
  const user_id = req.body.id, g2f_code = req.body.g2f_code

  db.getUser({id: user_id}, function (result) {

    if (result.status === 1) {
      let user = result.user

      isAuthenticated(req.headers['authorization'], user, function (result1) {
        if (result1.status === 0) {

          // Not authorized
          res.end(JSON.stringify({ status: 0, msg: 'INCORRECT_TOKEN' }))

        } else {

          if (googleAuth.checkCode(user.g2f_key, g2f_code)) {

            db.updateUser(user_id, {g2f_enabled: 1}, function (result) { })

            res.end(JSON.stringify({ status: 1 }))
          } else {
            // Incorrect G2f code
            res.end(JSON.stringify({ status: 0, msg: 'INVALID_CODE' }))
          }
        }
      })
    } else {
      // Invalid request
      res.end(JSON.stringify({ status: 0, msg: 'INVALID_REQUEST' }))
    }
  })
}

const changePassword = (req, res) => {
  let user = req.body.user,
    g2f_code = req.body.g2f_code,
    current_password = req.body.current_password,
    new_password = req.body.new_password

  db.getUser({id: user.id}, function (result) {
    if (result.status === 1) {

      user = result.user

      if (user.g2f_enabled && (!g2f_code || !googleAuth.checkCode(user.g2f_key, g2f_code))) {
        res.end(JSON.stringify({
          status: 0,
          msg: 'INVALID_CODE'
        }))
        return
      }

      if (current_password !== result.user.password) {

        res.end(JSON.stringify({
          status: 0,
          msg: 'INCORRECT_CURRENT_PWD'
        }))

      } else {

        db.updateUser(user.id, {password: new_password}, function (result) {
          if (result.status === 1)
            res.end(JSON.stringify({status: 1}))
          else
            res.end(JSON.stringify({
              status: 0,
              msg: 'WRONG'
            }))
        })

      }
    } else {
      res.end(JSON.stringify({
        status: 0,
        msg: 'WRONG'
      }))
    }
  })

}

module.exports = {
  register,
  login,
  activateAccount,
  enableG2f,
  validateG2fLogin,
  g2fLogin,
  changePassword,
  sendForgotEmail,
  validateResetPasswordLink,
  resetPassword
}




