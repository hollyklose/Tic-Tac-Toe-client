'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui')
const gamesApi = require('../games/api')
const gamesUi = require('../games/ui')
const gamesEvents = require('../games/events')
const cipher = require('../games/coordCipher')
const store = require('../store')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .then(gamesEvents.onGameCreate)
    .then(onSignInGetStats)
    .catch(ui.onSignInFailure)
}

const onSignInGetStats = () => {
  gamesApi.getStats()
    .then((responseData) => {
      store.gamesPlayed = responseData.games.length
      let win = 0
      for (let i = 0; i < responseData.games.length; i++) {
        const playerArr = cipher.cipherData(responseData.games[i].cells)
        if (playerArr.length > 2) {
          const isWin = gamesEvents.checkForWin(playerArr)
          if (isWin) {
            win++
          }
        }
      }
      store.gamesWon = win
      gamesUi.onSignInGetStatsSuccess()
    })
    .catch(gamesUi.onSignInGetStatsFailure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onSignInGetStats
}
