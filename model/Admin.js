const mongoose = require('mongoose');

const multer = require('multer');

const AVATAR_PATH = "/uploads/admins";

const path = require('path');

const MovieSchema = mongoose.Schema({
    images: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    plot: {
        type: String,
        required: true
    },
    gener: {
        type: Array,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    declaration: {
        type: String,
        required: true
    },
    release: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    casting: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    language: {
        type: Array,
        required: true
    },

})

const imageupload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

MovieSchema.statics.imageuploadData = multer({ storage: imageupload }).single('images');
MovieSchema.statics.avatarPath = AVATAR_PATH;

const Admin = mongoose.model('Admin', MovieSchema);

module.exports = Admin;