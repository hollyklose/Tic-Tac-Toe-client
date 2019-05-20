'use strict'
// const api = require('./api.js')
const ui = require('./ui')
const api = require('./api.js')
const cipher = require('./coordCipher')
const store = require('../store')

const onResetGame = () => {
  resetGame()
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
}

const resetGame = () => {
  event.preventDefault()
  $('#0').attr('src', '/assets/images/bat.png')
  $('#1').attr('src', '/assets/images/bat.png')
  $('#2').attr('src', '/assets/images/bat.png')
  $('#3').attr('src', '/assets/images/bat.png')
  $('#4').attr('src', '/assets/images/bat.png')
  $('#5').attr('src', '/assets/images/bat.png')
  $('#6').attr('src', '/assets/images/bat.png')
  $('#7').attr('src', '/assets/images/bat.png')
  $('#8').attr('src', '/assets/images/bat.png')
  $('#0').css('opacity', '.2')
  $('#1').css('opacity', '.2')
  $('#2').css('opacity', '.2')
  $('#3').css('opacity', '.2')
  $('#4').css('opacity', '.2')
  $('#5').css('opacity', '.2')
  $('#6').css('opacity', '.2')
  $('#7').css('opacity', '.2')
  $('#8').css('opacity', '.2')
  store.playerTurn = 'x'
  $('#playerTracker').find('h2').find('img').attr('src', '/assets/images/octopus.png')
  $('#userMessage').text("It's player one: The Octopus' turn!")
  $('.container-fluid').css('pointer-events', 'auto')
  onResetGetStats()
}

const onResetGetStats = () => {
  api.create()
    .then(ui.onGameCreateSuccess)
    .then(api.getStats)
    .then((responseData) => {
      let win = 0
      console.log('responsedata.games', responseData.games)
      for (let i = 0; i < responseData.games.length; i++) {
        const playerArr = cipher.cipherData(responseData.games[i].cells)
        if (playerArr.length > 2) {
          const isWin = checkForWin(playerArr)
          if (isWin) {
            win++
          }
        }
      }
      store.gamesWon = win
      store.gamesPlayed = responseData.games.length
      ui.onSignInGetStatsSuccess()
    })
    .catch(ui.onSignInGetStatsFailure)
    // .catch(ui.onGameCreateFailure)
}

// Return true if the player has won
const checkForWin = (playerArr) => {
  // Check if there are at least 3 matching values of the X coord
  let indexes = {
    0: 0,
    1: 0,
    2: 0
  }
  playerArr.forEach((coordObj) => {
    indexes[coordObj[0]] += 1
    return indexes
  })
  // THE NUMBERS ARE KEYS IN AN OBJECT
  if (indexes[0] > 2 || indexes[1] > 2 || indexes[2] > 2) {
    return true
  }
  // Check if there are at least 3 matching values of the y coord
  indexes = {
    0: 0,
    1: 0,
    2: 0
  }
  playerArr.forEach((coordObj) => {
    indexes[coordObj[1]] += 1
    return indexes
  })
  // THE NUMBERS ARE KEYS IN AN OBJECT
  if (indexes[0] > 2 || indexes[1] > 2 || indexes[2] > 2) {
    return true
  }
  // CHECK FOR THIRD SCENARIO
  let middleSpace = false
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i][0] === 1 && playerArr[i][1] === 1) {
      middleSpace = true
    }
  }
  if (!middleSpace) {
    return false
  }
  let first = false
  let second = false
  for (let i = 0; i < playerArr.length; i++) {
    if ((playerArr[i][0] === 0 && playerArr[i][1] === 2)) {
      first = true
    }
  }
  for (let i = 0; i < playerArr.length; i++) {
    if ((playerArr[i][0] === 2 && playerArr[i][1] === 0)) {
      second = true
    }
  }
  if (middleSpace && first && second) {
    return true
  }
  first = false
  second = false
  for (let i = 0; i < playerArr.length; i++) {
    if ((playerArr[i][0] === 0 && playerArr[i][1] === 0)) {
      first = true
    }
  }
  for (let i = 0; i < playerArr.length; i++) {
    if ((playerArr[i][0] === 2 && playerArr[i][1] === 2)) {
      second = true
    }
  }
  if (middleSpace && first && second) {
    return true
  }
  return false
}
const checkForTie = (playerArr) => {
  const newArr = []
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i] !== '') {
      newArr.push(playerArr[i])
    }
  }
  if (newArr.length === 9) {
    return true
  } else {
    return false
  }
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
    })
    .then(() => {
      const playerArr = cipher.cipherData(store.game.cells)
      if (playerArr.length > 2) {
        if (checkForWin(playerArr)) {
          console.log('win: ' + store.playerTurn)
          console.log('wooo:', store.playerTurn)
          api.updateGameOver()
            .then(ui.onGameWin(event.target))
            .catch(ui.onGameCreateFailure)
        } else if (checkForTie(store.game.cells)) {
          console.log('cells:' + store.game.cells)
          console.log('lose: ' + store.playerTurn)
          api.updateGameOver()
            .then(ui.onGameTie(event.target))
            .catch(ui.onGameCreateFailure)
        } else {
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
  onGameCreate,
  checkForWin
}
