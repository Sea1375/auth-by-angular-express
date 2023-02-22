const axios = require('axios')
const utils = require('../utils/utils')

const {responses} = require('../utils/responses')

// get client credentials grant
const clientCredentialsGrant = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  axios.post(`${process.env.LEARNWORLDS_URL}/oauth2/access_token`, {
    client_id: process.env.LEARNWORLDS_CLIENT_ID,
    client_secret: process.env.LEARNWORLDS_CLIENT_SECRET,
    grant_type: 'client_credentials'
  }, {
    headers: {
      'Lw-Client': process.env.LEARNWORLDS_CLIENT_ID
    }
  }).then(response => {

    try {
      utils.updateEnv('LEARNWORLDS_ACCESS_TOKEN', response.data.tokenData.access_token, function (result) {
        res.end(result)
      })

    } catch (e) {
      res.end(responses('errorAccessToken'))
    }

  }).catch(error => {
    res.end(responses('errorAccessToken'))
  })
}

const getUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  axios.get(`${process.env.LEARNWORLDS_URL}/v2/users`, {
    headers: {
      'Authorization': `Bearer ${process.env.LEARNWORLDS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Lw-Client': process.env.LEARNWORLDS_CLIENT_ID
    }
  }).then(response => {

    try {
      let users = response.data.data

      users = users.map(user => {
        return {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          created: user.created
        }
      })

      res.end(JSON.stringify(users))
    } catch (e) {
      res.end(JSON.stringify('errorAccessToken'))
    }

  }).catch(error => {
    res.end(responses('errorAccessToken'))
  })
}

const getCourses = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  axios.get(`${process.env.LEARNWORLDS_URL}/v2/courses`, {
    headers: {
      'Authorization': `Bearer ${process.env.LEARNWORLDS_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'Lw-Client': process.env.LEARNWORLDS_CLIENT_ID
    }
  }).then(response => {

    try {
      let courses = response.data.data

      courses = courses.map(course => {
        return {
          id: course.id,
          title: course.title,
          description: course.description,
          author: course.author,
          original_price: course.original_price,
          discount_price: course.discount_price,
          final_price: course.final_price,
          dripFeed: course.dripFeed,
          access: course.access,
          categories: course.categories,
          created: course.created,
          expires: course.expires,
          expiresType: course.expiresType,
        }
      })

      res.end(JSON.stringify(courses))
    } catch (e) {
      res.end(JSON.stringify('errorAccessToken'))
    }

  }).catch(error => {
    res.end(responses('errorAccessToken'))
  })
}

module.exports = {
  clientCredentialsGrant,
  getUsers,
  getCourses
}
