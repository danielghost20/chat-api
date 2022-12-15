const messageControllers = require('./messages.controllers')

const getMessages = (req, res) => {
    const conversationId = req.params.conversation_id
    messageControllers.findAllMessages(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMessagesById = (req, res) => {
    const id = req.params.message_id //? que ID toma de /api/v1/conversations/:conversation_id/messages/:message_id - El de conversation o el de message?
    messageControllers.findMessageById(id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postMessage = (req, res) => {
    const {message} = req.body
    const conversationId = req.params.conversation_id
    const userId = req.user.id
    messageControllers.createMessage({userId, conversationId, message})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                message: 'String'
            }})
        })
}

const deleteMessage = (req, res) => {
    const id = req.params.message_id 
    messageControllers.deleteMessage(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getMessages,
    getMessagesById,
    postMessage,
    deleteMessage
}