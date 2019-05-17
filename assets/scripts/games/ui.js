'use strict'

const store = require('../store')

store.playerTurn = 'x'

const onAddCellSuccess = (target) => {
  console.log('target: ' + target)
  console.log('playerturn in ui: ' + store.playerTurn)
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', '/assets/images/octopus.png')
    store.playerTurn = 'o'
    $('#userMessage').text("It's player two: The Chickie's turn!")
    $('#playerTracker').find('p').find('img').attr('src', '/assets/images/duck.png')
  } else {
    $(target).attr('src', '/assets/images/duck.png')
    store.playerTurn = 'x'
    $('#userMessage').text("It's player one: The Octopus' turn!")
    $('#playerTracker').find('p').find('img').attr('src', '/assets/images/octopus.png')
  }
  $(target).off('click')
  $(target).on('click', () => $('#userMessage').text('That space has already been taken!'))
}

const onAddCellFailure = () => {
  $('#userMessage').text('The internet fell apart! Please try again!')
}

const onGameCreateSuccess = (responseData) => {
  $('#userMessage').text("Welcome to a new game! It's the Octopus' turn!")
  $('#playerTracker').find('p').find('img').attr('src', '/assets/images/octopus.png')
  store.game = responseData.game
}

const onGameCreateFailure = () => {
  $('#userMessage').text('We are so embarassed something went wrong! Please click the Reset Game button.')
}

const onGameWin = (target) => {
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', '/assets/images/octopus.png')
    $('#userMessage').text('The Octopus won!')
  } else {
    $(target).attr('src', '/assets/images/duck.png')
    $('#userMessage').text('The Chickie won!')
  }
  $('.container-fluid').css('pointer-events', 'none')
}

const onGameTie = (target) => {
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', '/assets/images/octopus.png')
  } else {
    $(target).attr('src', '/assets/images/duck.png')
  }
  $('#userMessage').text("It's a tie! Push the reset button to play again!")
  $('.container-fluid').css('pointer-events', 'none')
  // go back to EVENTS and patch to server
}

module.exports = {
  onAddCellSuccess,
  onAddCellFailure,
  onGameCreateSuccess,
  onGameCreateFailure,
  onGameWin,
  onGameTie
}
