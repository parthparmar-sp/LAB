const mongoose = require('mongoose')
const connectdb=async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connectedd");

    } catch (error) {
        console.log("error");

    }

}
exports.default =connectdb;