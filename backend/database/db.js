const mysql = require('mysql')
const randomstring = require('randomstring')

let pool = null

exports.connect = function(done) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  })

  done()
}

exports.get = function() {
  return pool
}

exports.createUser = function (user, done) {
  if (!pool) return done({status: 0})

  const keys = Object.keys(user),
    values = keys.map(function (key) { return '\'' + user[key] + '\''})

  pool.query('INSERT INTO admins (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', (err) => {
    if (err) {
      done({status: 0})
    }
    done({ status: 1 })
  })
}

exports.getUser = function (conditions, done) {
  if (!pool) return done({status: 0})

  const keys = Object.keys(conditions),
    values = keys.map(function (key) { return key + '=\'' + conditions[key] + '\'' })

  pool.query('SELECT * FROM admins WHERE ' + values.join(' and '), (err, result) => {

    if (err) {
      done({status: 0})
    }

    if (result.length === 0) {
      done({status: 0})
    }

    done({
      status: 1,
      user: result[0]
    })
  })
}

exports.updateUser = function (user_id, updates, done) {
  if (!pool) return done({status: 0})

  const keys = Object.keys(updates),
    values = keys.map(function (key) { return key + '=\'' + updates[key] + '\'' })

  pool.query('UPDATE admins SET ' + values.join(', ') + ' WHERE id=\'' + user_id + '\'', (err) => {
    if (err) {
      done({status: 0})
    }

    done({status: 1})
  })
}

exports.createResetPassword = function (resetPassword, done) {
  if (!pool) return done({status: 0})

  const keys = Object.keys(resetPassword),
    values = keys.map(function (key) { return '\'' + resetPassword[key] + '\''})

  pool.query('INSERT INTO reset_password (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', (err) => {
    if (err) {
      done({status: 0})
    }
    done({status: 1})
  })
}

exports.getResetPassword = function (confirmation_link, done) {
  if (!pool) return done({status: 0})

  pool.query('SELECT * FROM reset_password WHERE confirmation_link=' + '\'' + confirmation_link + '\'', (err, result) => {
    if (err) {
      done({ status: 0 })
      return
    }

    if (result.length === 0) {
      done({ status: 0 })
      return
    }

    done({
      status: 1,
      resetPassword: result[0]
    })
  })
}

exports.getResetPasswordFromId = function (id, done) {
  if (!pool) return done({status: 0})

  pool.query('SELECT * FROM reset_password WHERE admin_id=' + '\'' + id + '\'', (err, result) => {
    if (err) {
      done({ status: 0 })
      return
    }

    if (result.length === 0) {
      done({ status: 0 })
      return
    }

    done({
      status: 1,
      resetPassword: result[0]
    })
  })
}

exports.updateResetPassword = function (reset_id, updates, done) {
  if (!pool) return done({status: 0})

  const keys = Object.keys(updates),
    values = keys.map(function (key) { return key + '=\'' + updates[key] + '\'' })

  pool.query('UPDATE reset_password SET ' + values.join(', ') + ' WHERE id=\'' + reset_id + '\'', (err) => {
    if (err) {
      done({status: 0})
    }

    done({status: 1})
  })
}
