const mongoose = require("mongoose");

const DBConnect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI) .then(() => {
                console.log("Connected to the database successfully");
            })
    } catch (error) {
        console.log(`Error connecting to the database: ${error.message}`);
    }
}

module.exports = {DBConnect};