'use strict'

const store = require('../store')
const cipher = require('./coordCipher')

// const board = [ [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2],
// [1, 2], [2, 2] ]

const resetGame = () => {
  event.preventDefault()
  // RESET images
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
  // Reset player to store.playerturn = x
  store.playerTurn = 'x'
  // set playertracker to octopus, set usermessage to it's player one.
  $('#playerTracker').text('Player: Octopus!')
  $('#userMessage').text("It's player one: The Octopus' turn!")
  $('.container').css('pointer-events', 'auto')
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

module.exports = {
  resetGame,
  checkForWin,
  checkForTie
}
