const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model : Users
            }
        }
    })
    return data
}

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //? Creador de la conversacion (owner)
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //? este es el owner que viene desde el token
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const findConversationById = async(id) => {
    const data = await Conversations.findOne({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
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
                model: Participants,
                attributes: {
                    exclude: ['conversationId', 'userId', 'createdAt', 'updatedAt']
                },

                include: [
                    {
                        model: Users,
                        attributes: {
                        exclude: ['email', 'password','createdAt', 'updatedAt']
                }
                    }
                ]
            }
        ]
    })
    return data
}

const deleteConversationById = async(id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

module.exports = {
    findAllConversations,
    createConversation,
    findConversationById,
    deleteConversationById,
    updateConversation
}
