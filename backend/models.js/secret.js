const mongoose = require('mongoose');

const Secret = new mongoose.Schema({
    category :String,
    secret : String,
    user:String
})
const secret_model = mongoose.model('Secret',Secret);
module.exports = secret_model;
