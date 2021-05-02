// explicit id in mongoose

const mongoose = require('mongoose');
const id = new mongoose.Types.ObjectId();
console.log(id);

// get timestamp:

console.log(id.getTimestamp());

// validating ObjectId:

const isValid = mongoose.Types.ObjectId.isValid(id)
console.log(isValid)

