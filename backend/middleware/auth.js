const db = require('../database/db')

const isAuthenticated = (access_token, admin, done) => {

  if (access_token !== `Bearer ${admin.access_token}`) {
    done({status: 0})
  }
  done({status: 1})

  // db.getAdmin({id: admin.id}, function (res) {
  //   if (res.status === 0 || (res.status === 1 && res.admin.access_token !== admin.access_token)) {
  //     done({status: 0})
  //   }
  //   done({status: 1})
  // })
}

module.exports = {
  isAuthenticated
}
