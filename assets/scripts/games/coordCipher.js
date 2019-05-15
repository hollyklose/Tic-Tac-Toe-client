'use strict'

let cells = ["o","x","o","x","","x","o","x","o"]
const playerOne = []
const playerTwo = []

if (cells[0] === 'x') {
  playerOne.push([0, 0])
} else if (cells[0] === 'o') {
  playerTwo.push([0, 0])
}
if (cells[1] === 'x') {
  playerOne.push([1, 0])
} else if (cells[1] === 'o') {
  playerTwo.push([1, 0])
}
if (cells[2] === 'x') {
  playerOne.push([2, 0])
} else if (cells[2] === 'o') {
  playerTwo.push([2, 0])
}
if (cells[3] === 'x') {
  playerOne.push([0, 1])
} else if (cells[3] === 'o') {
  playerTwo.push([0, 1])
}
if (cells[4] === 'x') {
  playerOne.push([1, 1])
} else if (cells[4] === 'o') {
  playerTwo.push([1, 1])
}
if (cells[5] === 'x') {
  playerOne.push([2, 1])
} else if (cells[5] === 'o') {
  playerTwo.push([2, 1])
}
if (cells[6] === 'x') {
  playerOne.push([0, 2])
} else if (cells[6] === 'o') {
  playerTwo.push([0, 2])
}
if (cells[7] === 'x') {
  playerOne.push([1, 2])
} else if (cells[7] === 'o') {
  playerTwo.push([1, 2])
}
if (cells[8] === 'x') {
  playerOne.push([2, 2])
} else if (cells[8] === 'o') {
  playerTwo.push([2, 2])
}

module.exports = {
  playerOne,
  playerTwo
}
