const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    reciverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
    },
    text : {
        type : String,
    },
    image : {
        type : String,
    }
},
{
    timestamps: true,
});

const chat = mongoose.model('Chat', chatSchema);

module.exports = chat;