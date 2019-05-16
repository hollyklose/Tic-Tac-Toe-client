'use strict'

const authEvents = require('./auth/events')
const gamesEvents = require('./games/events')

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#change-pw').on('submit', authEvents.onChangePassword)
  $('#reset-game').on('submit', gamesEvents.onResetGame)
  $('#0').on('click', gamesEvents.onSpaceClicked)
  $('#1').on('click', gamesEvents.onSpaceClicked)
  $('#2').on('click', gamesEvents.onSpaceClicked)
  $('#3').on('click', gamesEvents.onSpaceClicked)
  $('#4').on('click', gamesEvents.onSpaceClicked)
  $('#5').on('click', gamesEvents.onSpaceClicked)
  $('#6').on('click', gamesEvents.onSpaceClicked)
  $('#7').on('click', gamesEvents.onSpaceClicked)
  $('#8').on('click', gamesEvents.onSpaceClicked)
})
