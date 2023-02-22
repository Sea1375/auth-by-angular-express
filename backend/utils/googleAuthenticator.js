const speakeasy = require('speakeasy')

const createKey = () => {
  const temp_secret = speakeasy.generateSecret()
  return temp_secret.base32
}

// Verify secret
const verify = (secret, token) => {
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: token
  })

  return verified
}

// Verify User Tokens
const checkCode = (secret, token) => {
  const validated = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1
  })

  return validated
}

module.exports = {
  createKey,
  verify,
  checkCode
}