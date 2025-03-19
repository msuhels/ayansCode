import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ReviewDetails = () => {
    let { id } = useParams();
    const [isCompanyData, setIsCompanyData] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        subject: "",
        discription: "",
        rating: "",
    });
    const [isRating, setIsRating] = useState(0);
    const [isAllReviews, setIsAllReviews] = useState([]);
    const [isReviewAvrage, setIsReviewAvrage] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const ratingChanged = (newRating) => {
        setIsRating(newRating)
    };

    const submitForm = (e) => {
        e.preventDefault();
        const updatedForm = {
            ...form,
            rating: isRating,
            companyId: id
        };

        axios.post(`${process.env.REACT_APP_API_URL}/review/add-review`, updatedForm)
            .then(response => {
                if (response.data) {
                    toast.success(response.data.message || "Data Added Successfully");
                    closeModal();
                    setForm({
                        name: "",
                        subject: "",
                        discription: "",
                        rating: "",
                    });
                    setIsRating(0);
                    getAllReviews();
                    window.location.reload();

                }
            })
            .catch(error => {
                toast.error(error || "Something went Wrong");
            });
    };

    const getAllReviews = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/review/get-all-review`, {
                company_id: id, searchQuery,
                startDate,
                endDate
            })
            if (response?.data) {
                setIsAllReviews(response?.data)
            }
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getAllReviews();
    }, []);

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove('modal-open');
    };

    const clearFilters = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
        getAllReviews();
    };


    useEffect(() => {
        getCompanyById();
    }, []);

    const getCompanyById = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/get-single-company`, { cmyId: id })
            setIsReviewAvrage(response?.data?.totalRating / response?.data?.reviewCount)
            setIsCompanyData(response?.data?.companyData);
        } catch (error) {
            console.log(error)
        }

    };





    return (
        <div>
            <TopHeader></TopHeader>
            <div className="mt-12 flex justify-between items-center max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-8">
                <div className="flex items-center">
                    <Link to="/" className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ">
                        Back
                    </Link>
                </div>
                <div className="flex items-center">
                    <div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search reviewer name"
                            className="border border-gray-400 rounded px-4 py-2"
                        />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-400 rounded px-4 py-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-400 rounded px-4 py-2"
                        />
                        <button onClick={getAllReviews} className="ms-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Find Company
                        </button>
                        <button onClick={clearFilters} className="ms-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-400 hover:bg-gray-500">
                Clear Filters
            </button>
                        {/* Display your companies here */}
                    </div>
                </div>
            </div>
            <hr className=' mt-5 mb-5 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-8'></hr>
            <div className="relative min-h-full flex flex-col mt-16">
                <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
                    <div className="flex-1 min-w-0 bg-white xl:flex">
                        <div className="bg-white lg:min-w-0 lg:flex-1  rounded-lg shadow-lg">
                            <div className="pl-4 pr-6 pt-4 pb-4 border-b border-t border-gray-200 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-6 xl:border-t-0">
                                <article aria-labelledby="question-title-81614">
                                    <div>
                                        <div className="flex ">
                                            <div className="flex-shrink-0">
                                                <img width={100} src={isCompanyData?.logo_url} alt="" />
                                            </div>
                                            <div className="min-w-0 flex-1 ml-5">
                                                <h1 className="text-2xl font-medium text-gray-900">
                                                    <Link to="#" className="hover:underline">{isCompanyData?.name }</Link>
                                                </h1>
                                                <p className="text-sm text-gray-500">
                                                    <Link to="#" className="hover:underline">
                                                        <span >{isCompanyData?.location} ,{isCompanyData?.city}</span>
                                                    </Link>
                                                </p>
                                                <p className="flex mt-8 items-center">
                                                    {!isNaN(isReviewAvrage) &&
                                                        <div className='me-2'>{parseFloat(isReviewAvrage).toFixed(1)}</div>
                                                    }

                                                    {isReviewAvrage &&
                                                        <ReactStars
                                                            count={5}
                                                            size={24}
                                                            value={isReviewAvrage}
                                                            activeColor="#ffd700"
                                                            edit={false}
                                                        />
                                                    }

                                                    <div className='ms-2'> {isCompanyData?.reviewCount}  Reviews</div>
                                                </p>
                                            </div>
                                            <div className="flex text-sm">
                                                <span className="items-center text-sm">
                                                    Founded on {isCompanyData?.founded}
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" flex justify-between space-x-8">
                                        <div className="flex space-x-6">
                                        </div>
                                        <div className="flex text-sm">
                                            <button onClick={openModal} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ">
                                                + Add Review
                                            </button>
                                        </div>
                                    </div>
                                </article>
                                <span className="ms-3 inline-flex items-center text-sm">
                                    Result Found: {isAllReviews.length}
                                </span>
                            </div>

                            <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">

                                {Array.isArray(isAllReviews) && isAllReviews.map((data, index) => {
                                    return (
                                        <li className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6" key={index}>
                                            <div className="flex items-center justify-between space-x-4">
                                                <div className="min-w-0 space-y-3">
                                                    <div className="flex items-center space-x-3">
                                                        <span className="block">
                                                            <h2 className="text-sm font-medium">
                                                                <Link to="">
                                                                    <span className="absolute inset-0" aria-hidden="true"></span>
                                                                    {data?.name}
                                                                </Link>
                                                            </h2>
                                                            <span className='text-sm text-gray-500 group-hover:text-gray-900 truncate' style={{ fontSize: "10px" }}>{data?.created_at}</span>
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 group-hover:text-gray-900  truncate" style={{ fontSize: "12px" }}> {data?.discription}</p>
                                                </div>
                                                <div className="sm:hidden">
                                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="hidden sm:flex flex-col flex-shrink-0 items-end space-y-3">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        value={data.rating}
                                                        edit={false}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
                {isAllReviews.length === 0 &&
                    <div className='text-center mt-5'>
                        <h2>No Review Found</h2>
                    </div>
                }
            </div>

            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-80">
                        <div className="bg-white rounded-lg shadow-lg p-6 mx-2" style={{ minWidth: "400px" }}>
                            <div className="mb-4 text-center">
                                <h1 className="text-2xl font-semibold">Add Review</h1>
                            </div>
                            <form onSubmit={submitForm}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Full Name</label>
                                    <input required type="text" value={form.name}
                                        onChange={handleFormChange} placeholder='Enter your name' id="name" name="name" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Subject</label>
                                    <input required type="text" value={form.subject}
                                        onChange={handleFormChange} placeholder="Enter subject" id="subject" name="subject" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Enter your review</label>
                                    <textarea required type="text" value={form.discription}
                                        onChange={handleFormChange} placeholder="Your review" id="discription" name="discription" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Rating</label>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <hr></hr>
                                <div className="flex justify-center mt-4">
                                    <button type='submit' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">
                                        Save
                                    </button>
                                    <button onClick={closeModal} className="ms-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
};

export default ReviewDetails;