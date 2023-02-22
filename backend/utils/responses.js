const responses = (action) => {
  const texts = {
    learnworldsWebhookNotVerified: 'Sorry, we are not able to verify the webhook request.',
    learnworldsToHubspotUserUpdated: 'We have processed the user from LearnWorlds in HubSpot CRM.',
    learnworldsAccessToken: 'We have updated the access token successfully.',
    userCreated: 'A user was created',
    userUpdated: 'A user was updated',
    productBought: 'A purchase occurs',
    enrolledFreeCourse: 'A user enrolls in a free course',
    errorReadFile: 'Can\'t read the file.',
    errorWriteFile: 'Can\'t write the file',
    errorAccessToken: 'We are not able to get an token.',
    errorUnexpected: 'An unexpected error occurred.',
    errorWebhookType: 'The webhook type does not match.',
    incorrectConfirmationCode: 'The confirmation code is incorrect.'
  }

  return texts[action]
}

module.exports = {
  responses
}
