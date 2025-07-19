import mongoose from 'mongoose';

async function connectMongoDb(Url) {
    return mongoose.connect(Url)
}


export default connectMongoDb;