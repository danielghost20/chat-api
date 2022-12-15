const router = require('express').Router()

const messageServices = require('./messages.servies')
const passportJWT = require('../middlewares/auth.middleware')

    router.route('/:conversation_id/messages')
        .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getMessages)
        .post(passportJWT.authenticate('jwt', {session: false}), messageServices.postMessage)

    router.route('/:conversation_id/messages/:message_id')
        .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getMessagesById)
        .delete(passportJWT.authenticate('jwt', {session: false}), messageServices.deleteMessage)

module.exports = router