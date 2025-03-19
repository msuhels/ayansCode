const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    founded: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    logo_url: {
        type: String,
        required: true,
        trim: true,
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("company", companySchema);
