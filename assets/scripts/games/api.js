'use strict'

const config = require('../config')
const store = require('../store')

const create = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const update = (target) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    data: {
      'game': {
        'cell': {
          'index': target.id,
          'value': store.playerTurn
        },
        'over': false
      }
    },
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateGameOver = () => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.game.id,
    method: 'PATCH',
    data: {
      'game': {
        'over': false
      }
    },
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  create,
  update,
  updateGameOver
}
