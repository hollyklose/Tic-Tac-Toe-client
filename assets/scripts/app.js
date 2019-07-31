'use strict'

const authEvents = require('./auth/events')
const gamesEvents = require('./games/events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  document.addEventListener('window.onload', $('#change-pw').hide())
  document.addEventListener('window.onload', $('#reset-game-div').hide())
  document.addEventListener('window.onload', $('#sign-out').hide())
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#change-pw').on('submit', authEvents.onChangePassword)
  $('#reset-game').on('submit', gamesEvents.onResetGame)
  $('.square').on('click', gamesEvents.onSpaceClicked)
})
