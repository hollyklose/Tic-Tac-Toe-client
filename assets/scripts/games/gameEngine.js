'use strict'

const cipher = require('./coordCipher')

const board = [ [0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2],
[1, 2], [2, 2] ]

// const resetGame = () => {
//   playerOne = []
//   playerTwo = []
// }

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
// IF NO WINNER, CHECK FOR TIE
const checkForTie = (playerOneArr, playerTwoArr) => {
  if (playerOneArr.length + playerTwoArr.length === 9) {
    return true
  } else {
    return false
  }
}
// ONLY CHECK FOR WIN AFTER PLAYER'S TURN- NEED EVENT LISTENER TO TRIGGER
// ALSO ONLY CHECK AFTER PLAYER'S THIRD TURN
console.log('win:' + checkForWin(cipher.playerTwo))
console.log('tie:' + checkForTie(cipher.playerOne, cipher.playerTwo))
