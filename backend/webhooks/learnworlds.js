const utils = require('../utils/utils')
const { responses } = require('../utils/responses')
const crm = require('../controllers/crm')

const userUpdated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {

    let user = {
      user_id: req.body.data.user.id,
      email: req.body.data.user.email,
      username: req.body.data.user.username,
      role: req.body.data.user.role.name,
      created: req.body.data.user.created
    }

    if (req.body.trigger === 'user_imported') {

      crm.createUser(user, function (result) {
        if (result) {
          res.end(responses('userCreated'))
        } else {
          res.end(responses('errorUnexpected'))
        }
      })

    } else if(req.body.trigger === 'user_updated') {

      crm.updateUser(user, function (result) {
        if (result) {
          res.end(responses('userUpdated'))
        } else {
          res.end(responses('errorUnexpected'))
        }
      })

    } else {
      res.end(responses('errorWebhookType'))
    }

  } catch (e) {
    res.end(responses('errorUnexpected'))
  }

}

const productBought = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {

    crm.productBought()
    res.end(responses('productBought'))

  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const enrolledFreeCourse = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.enrolledFreeCourse()
    res.end(responses('productBought'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const leadCreated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.leadCreated()
    res.end(responses('leadCreated'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const awardedCertificate = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.awardedCertificate()
    res.end(responses('awardedCertificate'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const courseCompleted = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.courseCompleted()
    res.end(responses('courseCompleted'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const subscriptionPaymentPlanBought = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.subscriptionPaymentPlanBought()
    res.end(responses('subscriptionPaymentPlanBought'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const subscriptionPaymentPlanCanceled = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.subscriptionPaymentPlanCanceled()
    res.end(responses('subscriptionPaymentPlanCanceled'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const subscriptionTrialStarted = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.subscriptionTrialStarted()
    res.end(responses('subscriptionTrialStarted'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const subscriptionTrialWillEnd = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.subscriptionTrialWillEnd()
    res.end(responses('subscriptionTrialWillEnd'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const previewedFree = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.previewedFree()
    res.end(responses('previewedFree'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const subscriptionUpdated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.subscriptionUpdated()
    res.end(responses('subscriptionUpdated'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const userUnenrolledFromProduct = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.userUnenrolledFromProduct()
    res.end(responses('userUnenrolledFromProduct'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const userTagAdded = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.userTagAdded()
    res.end(responses('userTagAdded'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const userTagDeleted = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.userTagDeleted()
    res.end(responses('userTagDeleted'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

const paymentCreated = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Verify Webhook request
  if (utils.learnworldsVerifiedWebhook(req.rawHeaders)) {
    res.end(responses('learnworldsWebhookNotVerified'))
  }

  try {
    crm.paymentCreated()
    res.end(responses('paymentCreated'))
  } catch (e) {
    res.end(responses('errorUnexpected'))
  }
}

module.exports = {
  userUpdated,
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