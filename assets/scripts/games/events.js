'use strict'
// const api = require('./api.js')
const ui = require('./ui')
const gameEngine = require('./gameEngine')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const cipher = require('./coordCipher')
const store = require('../store')

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
  api.create()
    .then(ui.onGameCreateSuccess)
    .catch(ui.onGameCreateFailure)
}

const onSpaceClicked = event => {
  event.preventDefault()
  console.log('events success')
  api.update(event.target)
    .then((responseData) => {
      store.game = responseData.game
      console.log('then' + store.game.cells)
      console.log('WHO', store.playerTurn)
    })
    .then(() => {
      console.log('cells: ', store.game.cells)
      const playerArr = cipher.cipherData(store.game.cells)
      console.log('playerArr:', playerArr)
      if (playerArr.length > 2) {
        console.log('inside if')
        if (gameEngine.checkForWin(playerArr)) {
          console.log('win: ' + store.playerTurn)
          console.log('wooo:', store.playerTurn)
          ui.onGameWin(event.target)
        } else if (gameEngine.checkForTie(store.game.cells)) {
          console.log('cells:' + store.game.cells)
          console.log('lose: ' + store.playerTurn)
          ui.onGameTie(event.target)
        } else {
          console.log('come on!')
          ui.onAddCellSuccess(event.target)
        }
      }
      if (playerArr.length <= 2) {
        ui.onAddCellSuccess(event.target)
      }
    })
    .catch(ui.onAddCellFailure)
}

module.exports = {
  onSpaceClicked,
  onResetGame,
  onGameCreate
}
