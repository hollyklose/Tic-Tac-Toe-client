'use strict'

const store = require('../store')

const onSignUpSuccess = responseData => {
  console.log('success', responseData)
  $('#message').text('Signed up successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onSignUpFailure = responseData => {
  console.log('failure', responseData)
  $('#message').text('Sign up failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onSignInSuccess = (responseData) => {
  $('#message').text('Signed in successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  store.user = responseData.user
  console.log('store is', store)
  $('form').trigger('reset')
}

const onSignInFailure = () => {
  $('#message').text('Sign in failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onSignOutSuccess = () => {
  $('#message').text('Signed out successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onSignOutFailure = () => {
  $('#message').text('Sign out failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  console.log('changed')
  $('#message').text('Changed password successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onChangePasswordFailure = () => {
  console.log('failure')
  $('#message').text('Change password failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
