'use strict'

const ui = require('./ui')
const api = require('./api.js')
const cipher = require('./coordCipher')
const store = require('../store')

const onResetGame = () => {
  resetGame()
  $('.square').off('click')
  $('.square').on('click', onSpaceClicked)
}

const resetGame = () => {
  event.preventDefault()
  $('.square').attr('src', 'public/bat.png')
  $('.square').css('opacity', '.2')
  store.playerTurn = 'x'
  $('#playerTracker').find('h2').find('img').attr('src', 'public/octopus.png')
  $('#userMessage').text("It's player one: The Octopus' turn!")
  $('.container').css('pointer-events', 'auto')
  onResetGetStats()
}

const onResetGetStats = () => {
  api.create()
    .then(ui.onGameCreateSuccess)
    .then(api.getStats)
    .then((responseData) => {
      let win = 0
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
}

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
  api.update(event.target)
    .then((responseData) => {
      store.game = responseData.game
    })
    .then(() => {
      const playerArr = cipher.cipherData(store.game.cells)
      if (playerArr.length > 2) {
        if (checkForWin(playerArr)) {
          api.updateGameOver()
            .then(ui.onGameWin(event.target))
            .catch(ui.onGameCreateFailure)
        } else if (checkForTie(store.game.cells)) {
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
