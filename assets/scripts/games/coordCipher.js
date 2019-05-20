'use strict'

const store = require('../store')

// let cells = ["o","x","o","x","","x","o","x","o"]
// const cells = []

const cipherData = (cells) => {
  store.playerOne = []
  store.playerTwo = []

  if (cells[0] === 'x') {
    store.playerOne.push([0, 0])
  } else if (cells[0] === 'o') {
    store.playerTwo.push([0, 0])
  }
  if (cells[1] === 'x') {
    store.playerOne.push([1, 0])
  } else if (cells[1] === 'o') {
    store.playerTwo.push([1, 0])
  }
  if (cells[2] === 'x') {
    store.playerOne.push([2, 0])
  } else if (cells[2] === 'o') {
    store.playerTwo.push([2, 0])
  }
  if (cells[3] === 'x') {
    store.playerOne.push([0, 1])
  } else if (cells[3] === 'o') {
    store.playerTwo.push([0, 1])
  }
  if (cells[4] === 'x') {
    store.playerOne.push([1, 1])
  } else if (cells[4] === 'o') {
    store.playerTwo.push([1, 1])
  }
  if (cells[5] === 'x') {
    store.playerOne.push([2, 1])
  } else if (cells[5] === 'o') {
    store.playerTwo.push([2, 1])
  }
  if (cells[6] === 'x') {
    store.playerOne.push([0, 2])
  } else if (cells[6] === 'o') {
    store.playerTwo.push([0, 2])
  }
  if (cells[7] === 'x') {
    store.playerOne.push([1, 2])
  } else if (cells[7] === 'o') {
    store.playerTwo.push([1, 2])
  }
  if (cells[8] === 'x') {
    store.playerOne.push([2, 2])
  } else if (cells[8] === 'o') {
    store.playerTwo.push([2, 2])
  }
  if (store.playerTurn === 'x') {
    return store.playerOne
  } else {
    return store.playerTwo
  }
}

module.exports = {
  cipherData
}
