const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Connection established');

    } catch (error) {
        console.log(error);
        throw new Error('Error while connecting to mongo');
    }
};

module.exports = {
    dbConnection,
};
