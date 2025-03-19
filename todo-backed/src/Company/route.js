const express = require("express");
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const {
    addCompany,
    addCompanyLogo,
    getAllcompanies,
    getSinglecompany,
} = require("./controller");

Router.route("/add-company").post(addCompany);
Router.post('/upload-company-logo', upload.single('logo'), addCompanyLogo);
Router.post('/get-all-companies',  getAllcompanies);
Router.post('/get-single-company',  getSinglecompany);



module.exports = Router;
