const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    class: {
        type: String,
        trim: true
    },
    parentName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: Number,
        trim: true
    },
    residence: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model("Child", childSchema);
