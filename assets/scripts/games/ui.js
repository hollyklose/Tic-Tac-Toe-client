'use strict'

const store = require('../store')

store.playerTurn = 'x'

const onAddCellSuccess = (target) => {
  console.log('success')
  console.log('target: ' + target)
  console.log('playerturn in ui: ' + store.playerTurn)
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', '/assets/images/octopus.png')
    store.playerTurn = 'o'
    $('#userMessage').text("It's player two: The Chickie's turn!")
    $('#playerTracker').text('Player: Chickie!')
  } else {
    $(target).attr('src', '/assets/images/duck.png')
    store.playerTurn = 'x'
    $('#userMessage').text("It's player one: The Octopus' turn!")
    $('#playerTracker').text('Player: Octopus!')
  }
  $(target).off('click')
  $(target).on('click', () => $('#userMessage').text('That space has already been taken!'))
}

const onAddCellFailure = () => {
  console.log('cell not added')
  $('#userMessage').text('The internet fell apart! Please try again!')
}

module.exports = {
  onAddCellSuccess,
  onAddCellFailure
}
