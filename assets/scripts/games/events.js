'use strict'
// const api = require('./api.js')
const ui = require('./ui')
const gameEngine = require('./gameEngine')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')

// const onSignIn = event => {
//   event.preventDefault()
//   const form = event.target
//   const formData = getFormFields(form)
//   console.log('success from events', formData)
//   api.signIn(formData)
//     .then(ui.onSignInSuccess)
//     .catch(ui.onSignInFailure)
// }

const onResetGame = () => {
  gameEngine.resetGame()
  // reset app event listeners
  $('#0').off('click')
  $('#1').off('click')
  $('#2').off('click')
  $('#3').off('click')
  $('#4').off('click')
  $('#5').off('click')
  $('#6').off('click')
  $('#7').off('click')
  $('#8').off('click')
  $('#0').on('click', onSpaceClicked)
  $('#1').on('click', onSpaceClicked)
  $('#2').on('click', onSpaceClicked)
  $('#3').on('click', onSpaceClicked)
  $('#4').on('click', onSpaceClicked)
  $('#5').on('click', onSpaceClicked)
  $('#6').on('click', onSpaceClicked)
  $('#7').on('click', onSpaceClicked)
  $('#8').on('click', onSpaceClicked)
  onGameCreate()
}

const onGameCreate = () => {
  console.log('success from events')
  api.create()
    .then(ui.onGameCreateSuccess)
    .catch(ui.onGameCreateFailure)
}

const onSpaceClicked = event => {
  event.preventDefault()
  console.log('events success')
  // This will need to be sent the id of the space as the index of cells array
  // Also, it needs to be passed value of x or o based on who the player is.
  // api.addCell(id, player)
  // remove parentheses once this is inside .THEN
  ui.onAddCellSuccess(event.target)
  // ui.onAddCellFailure()
}

module.exports = {
  onSpaceClicked,
  onResetGame,
  onGameCreate
}
