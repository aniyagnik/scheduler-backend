import mongoose from 'mongoose';

import * as taskDatabase from './taskDatabase.js';

mongoose.connect(process.env.MONGO_URL)
    .then(result => console.log('connected to Mongodb'))
    .catch(err => console.error(err));

export {
    taskDatabase
}