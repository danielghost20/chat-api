const router = require('express').Router()
const conversationServices = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')

router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getConversationsById)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.updateConversationById)

module.exports = router

