const router = require('express').Router()

const learnworlds = require('../controllers/learnworlds.js')
const auth = require('../controllers/auth')
const learnworldsWebhook = require('../webhooks/learnworlds')
const { isAuthenticated } = require('../middleware/auth')


// learnworlds APIs
router.post('/learnworlds/client-credentials-grant', function (req, res) {
  learnworlds.clientCredentialsGrant(req, res)
})

router.get('/learnworlds/get-users', function (req, res) {
  learnworlds.getUsers(req, res)
})

router.get('/learnworlds/get-courses', function (req, res) {
  learnworlds.getCourses(req, res)
})

// CRM APIs
router.post('/crm/auth/register', function (req, res) {
  auth.register(req, res)
})

router.post('/crm/auth/login', function (req, res) {
  auth.login(req, res)
})

router.post('/crm/auth/login/g2f', function (req, res) {
  auth.g2fLogin(req, res)
})

router.get('/crm/account/activate/:confirmation_code', function (req, res) {
  auth.activateAccount(req, res)
})

router.post('/crm/g2f/enable', function (req, res) {
  auth.enableG2f(req, res)
})

router.post('/crm/g2f/validate', function (req, res) {
  auth.validateG2fLogin(req, res)
})

router.post('/crm/account/send/forgot-email', function (req, res) {
  auth.sendForgotEmail(req, res)
})

router.post('/crm/validate/reset-password', function (req, res) {
  auth.validateResetPasswordLink(req, res)
})

router.post('/crm/account/reset-password', function (req, res) {
  auth.resetPassword(req, res)
})

router.post('/crm/change-password', function (req, res) {
  auth.changePassword(req, res)
})

// learnworlds Webhooks
router.post('/learnworlds/user-updated', function (req, res) {
  learnworldsWebhook.userUpdated(req, res)
})

router.post('/learnworlds/product-bought', function (req, res) {
  learnworldsWebhook.productBought(req, res)
})

router.post('/learnworlds/enrolled-free-course', function (req, res) {
  learnworldsWebhook.enrolledFreeCourse(req, res)
})

router.post('/learnworlds/lead-created', function (req, res) {
  learnworldsWebhook.leadCreated(req, res)
})

router.post('/learnworlds/awarded-certificate', function (req, res) {
  learnworldsWebhook.awardedCertificate(req, res)
})

router.post('/learnworlds/course-completed', function (req, res) {
  learnworldsWebhook.courseCompleted(req, res)
})

router.post('/learnworlds/subscription-payment-plan-bought', function (req, res) {
  learnworldsWebhook.subscriptionPaymentPlanBought(req, res)
})

router.post('/learnworlds/subscription-payment-plan-canceled', function (req, res) {
  learnworldsWebhook.subscriptionPaymentPlanCanceled(req, res)
})

router.post('/learnworlds/subscription-trial-started', function (req, res) {
  learnworldsWebhook.subscriptionTrialStarted(req, res)
})

router.post('/learnworlds/subscription-trial-will-end', function (req, res) {
  learnworldsWebhook.subscriptionTrialWillEnd(req, res)
})

router.post('/learnworlds/preview-free', function (req, res) {
  learnworldsWebhook.previewedFree(req, res)
})

router.post('/learnworlds/subscription-updated', function (req, res) {
  learnworldsWebhook.subscriptionUpdated(req, res)
})

router.post('/learnworlds/user-unenrolled-from-product', function (req, res) {
  learnworldsWebhook.userUnenrolledFromProduct(req, res)
})

router.post('/learnworlds/user-tag-added', function (req, res) {
  learnworldsWebhook.userTagAdded(req, res)
})

router.post('/learnworlds/user-tag-deleted', function (req, res) {
  learnworldsWebhook.userTagDeleted(req, res)
})

router.post('/learnworlds/payment-created', function (req, res) {
  learnworldsWebhook.paymentCreated(req, res)
})

module.exports = router