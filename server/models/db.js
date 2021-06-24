const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://Abdu:PP3VGcQu8E7CnT@clusterfunk.eoxle.mongodb.net/Civitas?retryWrites=true&w=majority")

const db = mongoose.connection;
db.once('open', (_) =>
console.log('MongoDB is now connected:')  
// console.log('MongoDB is now connected:', process.env.MONGODB_URL)
);
db.on('error', (err) => console.error('MongoDB connection error!', err));