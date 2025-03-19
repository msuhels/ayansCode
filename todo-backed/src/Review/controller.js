const review_model = require("../Review/model");
const mongoose = require('mongoose');

const addReview = async (req, res) => {
    try {
        const data = req.body;
        const newReview = new review_model({
            company_id: data?.companyId,
            name: data?.name,
            subject: data?.subject,
            discription: data?.discription,
            rating: data?.rating,
        });
        newReview.save();
        res.status(200).json({ newReview: newReview, message: "Review Added Successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };

}

const addCompanyLogo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const logo_url = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
        res.status(200).json({ logo_url: logo_url });
    } catch (err) {
        res.status(400).json({ error: err.message });
    };
};

const getAllReview = async (req, res) => {
    const { company_id, searchQuery, startDate, endDate } = req.body;
    try {
        let matchQuery = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { company_id: { $regex: company_id, $options: 'i' } }
            ]
        };

        // Add date filter if startDate and endDate are provided
        if (startDate && endDate) {
            matchQuery.created_at = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        let reviewData = await review_model.aggregate([
            {
                $match: matchQuery
            },
            {
                $sort: { created_at: -1 }
            }
        ]);
        res.status(200).json(reviewData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {
    addReview,
    addCompanyLogo,
    getAllReview,
};
