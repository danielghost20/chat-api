const uuid = require('uuid')

const Users = require('../models/users.models')
const Conversations = require('../models/conversations.models')
const Messages= require('../models/messages.models')

const findAllMessages = async(id) => {
    const data = await Messages.findAll({
        attributes: {
            exclude: ['userId', 'conversationId', 'createdAt', 'updatedAt']
        },
        where: {
            conversationId: id
        },

        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password','createdAt', 'updatedAt']
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ],
    })
    return data
}

const findMessageById = async(id) => {
    const data = await Messages.findOne({
        attributes: {
            exclude: ['userId', 'conversationId', 'createdAt', 'updatedAt']
        },
        where: {
            id: id
        },
        include: [
            {
                model: Users,
                attributes: {
                    exclude: ['email', 'password','createdAt', 'updatedAt']
                }
            },
            {
                model: Conversations,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

const createMessage = async(obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}

const deleteMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findAllMessages,
    findMessageById,
    createMessage,
    deleteMessage
}