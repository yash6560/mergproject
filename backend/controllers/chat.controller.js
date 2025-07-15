const usersModel = require('../models/auth.model');
const chatModel = require('../models/chat.model');

const getUsers = async(req, res) => {
    userId = req.user.userId;
    try {
        const usersLists = await usersModel.find({_id: {$ne : userId}}).select('-password');
        return res.status(200).json(usersLists);
    } catch (error) {
        console.log(`error message : `, error);
        return res.status(500).json("error in fetch user in chat");
    }
}

const sendMessage = async (req, res) => {
    const { text, receiverId  } = req.body;
    const image = req.file?.path;
    const senderId = req.user.userId;    
    try {
        const newMessage = await chatModel.create({
            senderId : senderId,
            reciverId : receiverId,
            text : text || '',
            image : image || '',
        });

    return res.status(200).json(newMessage);
        
    } catch (error) {
        console.log(`error message : `, error);
        return res.status(500).json("error in send chat");
    }
}

const getMessage = async (req, res) => {
    const senderId = req.user.userId;
    const { reciverId } = req.body;
    console.log(reciverId);

    try {
        const getMessage = await chatModel.find({ $or : [{senderId : senderId, reciverId : reciverId},{senderId : reciverId, reciverId : senderId}]}).sort({ createdAt: 1 });

        return res.status(200).json(getMessage);
        
    } catch (error) {
        console.log(`error message : `, error);
        return res.status(500).json("error in get chat");
    }
}

module.exports = {getUsers, sendMessage, getMessage}
