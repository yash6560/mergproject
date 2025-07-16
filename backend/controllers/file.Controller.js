const usersModel = require('../models/auth.model');

const fileUpload = async(req, res) => {
    const userId = req.user.userId;
    const filePath = req.file?.path;
    
    try {
        const existuser = await usersModel.findById(userId);

        if (!existuser) return res.status(404).json({ message: 'User not found' });

        existuser.filesUploded.push(filePath);

        await existuser.save();

        return res.status(200).json({message: 'File uploaded and saved to user', success:true, fileUrl: filePath});
        
    } catch (error) {
        console.log('/error message : ', error);
        return res.status(500).json("error in file Upload"); 
    }
}

module.exports = {fileUpload}