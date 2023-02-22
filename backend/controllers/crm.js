const db = require('../database/db')
const { responses } = require('../utils/responses')

const createUser = (user, done) => {
  db.createUser(user, function (result) {
    done(result)
  })
}

const updateUser = (user, done) => {
  db.updateUser(user, function (result) {
    done(result)
  })
}

const productBought = (req, res) => {

}

const enrolledFreeCourse = (req, res) => {

}

const leadCreated = (req, res) => {

}

const awardedCertificate = (req, res) => {

}

const courseCompleted = (req, res) => {

}

const subscriptionPaymentPlanBought = (req, res) => {

}

const subscriptionPaymentPlanCanceled = (req, res) => {

}

const subscriptionTrialStarted = (req, res) => {

}

const subscriptionTrialWillEnd = (req, res) => {

}

const previewedFree = (req, res) => {

}

const subscriptionUpdated = (req, res) => {

}

const userUnenrolledFromProduct = (req, res) => {

}

const userTagAdded = (req, res) => {

}

const userTagDeleted = (req, res) => {

}

const paymentCreated = (req, res) => {

}


module.exports = {
  createUser,
  updateUser,
  productBought,
  enrolledFreeCourse,
  leadCreated,
  awardedCertificate,
  courseCompleted,
  subscriptionPaymentPlanBought,
  subscriptionPaymentPlanCanceled,
  subscriptionTrialStarted,
  subscriptionTrialWillEnd,
  previewedFree,
  subscriptionUpdated,
  userUnenrolledFromProduct,
  userTagAdded,
  userTagDeleted,
  paymentCreated
}