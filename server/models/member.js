require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  province: String,
  city: String,
  postalCode: String,
  contactNumber:[
    {
      name: String,
      phoneNumber: String
    },
  ],
  emailAddress:{
    type: String,
    required: true,
    unique: true,
    // trim:true
  },
  active: Boolean,
  memberSince: Date,
  renewalDate: Date,
  lastUpdateDate: Date
});

module.exports = mongoose.model('Member', memberSchema, 'member');