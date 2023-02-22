const fs = require('fs')
const path = require('path')
const { responses } = require('./responses')
const db = require('../database/db')

const updateEnv = (variable, value, fn) => {

  try {
    fs.readFile(path.join(__dirname, '../.env'), 'utf8', function (err, data) {

      if (err) {
        fn(responses('errorReadFile'))
      } else {

        let lines = data.split('\n')

        lines = lines.map(line => {
          return line.includes(variable) ? `${variable}=${value}` : line
        })

        fs.writeFile(path.join(__dirname, '../.env'), lines.join('\n'), function (err, data) {
          if (err) {
            fn(responses('errorWriteFile'))
          } else {
            fn(responses('learnworldsAccessToken'))
          }
        })
      }
    })

  } catch (e) {
    fn(responses('errorUnexpected'))
  }

}

const learnworldsVerifiedWebhook = (header) => {
  return header.includes(`v1=${process.env.LEARNWORLDS_WEBHOOK_SIGNATURE}`)
}

const sendMail = () => {

}

const validateConfirmationLink = (confirmation_link, done) => {
  if (!confirmation_link) {
    done({ status: 0, msg: 'INVALID_CONFIRMATION_LINK' })
    return
  }

  db.getResetPassword(confirmation_link, function (result) {

    if (result.status === 0) {
      done({ status: 0, msg: 'INVALID_CONFIRMATION_LINK' })
    } else {

      const resetPassword = result.resetPassword

      if (resetPassword.expiration_time < new Date().getTime().toString()) { // confirmation link is expired
        done({ status: 0, msg: 'EXPIRED_CONFIRMATION_LINK' })
      } else {

        db.getUser({id: resetPassword.admin_id}, function (result1) {
          if (result1.status === 0) {
            done({ status: 0, msg: 'WRONG' })
          } else {

            done({
              status: 1,
              confirmation_link: confirmation_link,
              user: result1.user,
              resetPassword: resetPassword
            })
          }
        })
      }
    }
  })
}


module.exports = {
  learnworldsVerifiedWebhook,
  updateEnv,
  sendMail,
  validateConfirmationLink
}