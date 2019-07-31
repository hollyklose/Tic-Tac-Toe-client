'use strict'

const store = require('../store')

const onSignUpSuccess = responseData => {
  $('#message').text('Signed up successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
  $('#sign-up').hide()
}

const onSignUpFailure = responseData => {
  $('#message').text('Sign up failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onSignInSuccess = (responseData) => {
  $('#message').text('Signed in successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  store.user = responseData.user
  $('form').trigger('reset')
  $('.container').css('pointer-events', 'auto')
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-pw').show()
  $('#reset-game-div').show()
  $('#sign-out').show()
  $('#playerTracker').find('img').show()
  // $('#playerTracker').find('h2').find('img').attr('src', 'public/octopus.png')
  $('#playerTracker').find('h2').find('img').css('opacity', '1')
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
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-pw').hide()
  $('#reset-game-div').hide()
  $('#sign-out').hide()
  $('#playerTracker').find('img').hide()
  // $('#playerTracker').find('h2').find('img').attr('src', '')
  $('.container').css('pointer-events', 'none')
  $('.square').attr('src', 'public/bat.png')
  // $('#0').attr('src', 'public/bat.png')
  // $('#1').attr('src', 'public/bat.png')
  // $('#2').attr('src', 'public/bat.png')
  // $('#3').attr('src', 'public/bat.png')
  // $('#4').attr('src', 'public/bat.png')
  // $('#5').attr('src', 'public/bat.png')
  // $('#6').attr('src', 'public/bat.png')
  // $('#7').attr('src', 'public/bat.png')
  // $('#8').attr('src', 'public/bat.png')
  $('.square').css('opacity', '.2')
  // $('#0').css('opacity', '.2')
  // $('#1').css('opacity', '.2')
  // $('#2').css('opacity', '.2')
  // $('#3').css('opacity', '.2')
  // $('#4').css('opacity', '.2')
  // $('#5').css('opacity', '.2')
  // $('#6').css('opacity', '.2')
  // $('#7').css('opacity', '.2')
  // $('#8').css('opacity', '.2')
  $('#games-played').text(`Sign in to see how many games you've played!`)
  $('#games-won').text('')
  $('#games-tied').text('')
}

const onSignOutFailure = () => {
  $('#message').text('Sign out failed')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onChangePasswordSuccess = () => {
  $('#message').text('Changed password successfully!')
  setTimeout(() => $('#message').text(''), 5000)
  $('form').trigger('reset')
}

const onChangePasswordFailure = () => {
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
