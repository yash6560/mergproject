const mongoose = require('mongoose');

const authModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
        type: String,
        default: 'https://avatar.iran.liara.run/public/49',
    },
    address: {
        type: String,
        default: '',
    },
    phone: {
        type: Number,
        default: '',
    },

  },
  {
    timestamps: true,
  }
);

const authUser = mongoose.model('User', authModel);
module.exports = authUser;