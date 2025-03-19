const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    company_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    discription: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model("review", companySchema);
