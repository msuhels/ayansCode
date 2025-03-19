const company_model = require("../Company/model");
const review_model = require("../Review/model");

const addCompany = async (req, res) => {
    try {
        const data = req.body;
        const newCompany = new company_model({
            name: data?.companyName,
            location: data?.location,
            founded: data?.foundedOn,
            city: data?.city,
            logo_url: data?.logoUrl,
        });
        newCompany.save();
        res.status(200).json({ newCompany: newCompany, message: "Company Added Successfully" });
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

const getAllcompanies = async (req, res) => {
    const { searchQuery } = req.body;
    try {
        let companyData = await company_model.aggregate([
            {
                $match: {
                    $or: [
                        { city: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search for city
                        { location: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search for location
                    ]
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'company_id',
                    as: 'reviews'
                }
            },
            {
                $addFields: {
                    reviewCount: { $size: '$reviews' },
                    totalRating: {
                        $sum: {
                            $map: {
                                input: '$reviews',
                                as: 'review',
                                in: { $convert: { input: '$$review.rating', to: 'int', onError: 0 } }
                            }
                        }
                    },
                }
            },
            {
                $sort: { created_at: -1 }
            }
        ]);
        res.status(200).json(companyData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const getSinglecompany = async (req, res) => {
    const { cmyId } = req.body;
    try {
        let companyData = await company_model.findOne({ _id: cmyId }).sort({ created_at: -1 });
        let reviewData = await review_model.find({ company_id: companyData?._id }).sort({ created_at: -1 });
        let reviewCount = reviewData.length
        let totalRating = 0;
        for (let review of reviewData) {
            totalRating += review.rating;
        }

        res.status(200).json({ companyData, totalRating, reviewCount });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



module.exports = {
    addCompany,
    addCompanyLogo,
    getAllcompanies,
    getSinglecompany
};
