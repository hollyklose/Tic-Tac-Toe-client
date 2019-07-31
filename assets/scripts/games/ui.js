'use strict'

const store = require('../store')
const messages = require('./messages')

const winMessage = winMessages => {
  return winMessages[Math.floor(Math.random() * winMessages.length)]
}
const octopusMessage = octopusMessages => {
  return messages.octopusMessages[Math.floor(Math.random() * messages.octopusMessages.length)]
}

const chickieMessage = chickieMessage => {
  return messages.chickieMessages[Math.floor(Math.random() * messages.chickieMessages.length)]
}
const tieMessage = tieMessages => {
  return messages.tieMessages[Math.floor(Math.random() * messages.tieMessages.length)]
}

store.playerTurn = 'x'

const onAddCellSuccess = (target) => {
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', 'public/octopus.png')
    store.playerTurn = 'o'
    $('#userMessage').text(chickieMessage(messages.chickieMessages))
    $('#playerTracker').find('h2').find('img').attr('src', 'public/duck.png')
  } else {
    $(target).attr('src', 'public/duck.png')
    store.playerTurn = 'x'
    $('#userMessage').text(octopusMessage(messages.octopusMessages))
    $('#playerTracker').find('h2').find('img').attr('src', 'public/octopus.png')
  }
  $(target).off('click')
  $(target).on('click', () => $('#userMessage').text('That space has already been taken!'))
}

const onAddCellFailure = () => {
  $('#userMessage').text('The internet fell apart! Please try again!')
}

const onGameCreateSuccess = (responseData) => {
  $('#userMessage').text("Welcome to a new game! It's the Octopus' turn!")
  $('#playerTracker').find('h2').find('img').attr('src', 'public/octopus.png')
  store.game = responseData.game
}

const onGameCreateFailure = () => {
  $('#userMessage').text('We are so embarassed something went wrong! Please click the Reset Game button.')
}

const onGameWin = (target) => {
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', 'public/octopus.png')
    $('#userMessage').text(winMessage(messages.winMessages) + 'The Octopus won! Please Reset Game to play again.')
  } else {
    $(target).attr('src', 'public/duck.png')
    $('#userMessage').text(winMessage(messages.winMessages) + 'The Chickie won Please Reset Game to play again!')
  }
  $('.container').css('pointer-events', 'none')
}

const onGameTie = (target) => {
  $(target).css('opacity', 1)
  if (store.playerTurn === 'x') {
    $(target).attr('src', 'public/octopus.png')
  } else {
    $(target).attr('src', 'public/duck.png')
  }
  $('#userMessage').text(tieMessage(messages.tieMessages))
  $('.container').css('pointer-events', 'none')
}

const onSignInGetStatsSuccess = () => {
  $('#games-played').text(`You have played ${store.gamesPlayed} games!`)
  $('#games-won').text(`You have won ${store.gamesWon}!`)
  if (store.gamesPlayed > 9) {
    $('#10-games-played').css('opacity', 1)
  }
  if (store.gamesWon > 9) {
    $('#10-games-won').css('opacity', 1)
  }
  if (store.gamesPlayed > 99) {
    $('#100-games-played').css('opacity', 1)
  }
  if (store.gamesWon > 99) {
    $('#100-games-won').css('opacity', 1)
  }
}

const onSignInGetStatsFailure = () => {
  $('#games-played').text("We're very sorry, but your stats are unavailable.")
}

module.exports = {
  onAddCellSuccess,
  onAddCellFailure,
  onGameCreateSuccess,
  onGameCreateFailure,
  onGameWin,
  onGameTie,
  onSignInGetStatsSuccess,
  onSignInGetStatsFailure
}
