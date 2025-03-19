const express = require("express");
const Router = express.Router();

const {
    addReview,
    getAllReview,
} = require("./controller");

Router.route("/add-review").post(addReview);
Router.post('/get-all-review',  getAllReview);



module.exports = Router;
