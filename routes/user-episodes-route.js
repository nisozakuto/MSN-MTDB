const userEpisodeRoute = require('express').Router()

const userEpisodesController = require('../controllers/user_episodes-controller')

userEpisodeRoute.get('/', userEpisodesController.index)
userEpisodeRoute.post('/', userEpisodesController.create)
userEpisodeRoute.put('/:id([0-9]+)', userEpisodesController.update)
userEpisodeRoute.delete('/:id([0-9]+)', userEpisodesController.delete)

module.exports = userEpisodeRoute