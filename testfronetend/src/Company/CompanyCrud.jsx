import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import TopHeader from '../components/TopHeader';
import axios from 'axios';
import { toast } from 'react-toastify';

const CompanyCrud = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [form, setForm] = useState({
        companyName: "",
        location: "",
        foundedOn: "",
        city: "",
    });

    const [logoUrl, setLogoUrl] = useState("");
    const [isAllCompanies, setIsAllCompanies] = useState([]);
    const handleLogo = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('logo', file);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/upload-company-logo`, formData)
                if (response?.data) {
                    setLogoUrl(response?.data?.logo_url)
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const updatedForm = {
            ...form,
            logoUrl: logoUrl
        };

        axios.post(`${process.env.REACT_APP_API_URL}/company/add-company`, updatedForm)
            .then(response => {
                if (response.data) {
                    toast.success(response.data.message || "Data Added Successfully");
                    closeModal();
                    setForm({
                        companyName: "",
                        location: "",
                        foundedOn: "",
                        city: "",
                        logoUrl: "",
                    });
                    setLogoUrl("")
                    getAllCompanies();
                    window.location.reload();

                }
            })
            .catch(error => {
                toast.error(error || "Something went Wrong");
            });
    };

    const getAllCompanies = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/company/get-all-companies`, {
                searchQuery
            });

            if (response?.data) {
                setIsAllCompanies(response?.data)
            }
        } catch (error) {
            console.log(error)
        }

    };


    useEffect(() => {
        getAllCompanies();
    }, []);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove('modal-open');
    };



    return (
        <>
            <div className="min-h-full">
                <TopHeader></TopHeader>
                <div className="mt-12 flex justify-between items-center max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-8">
                    <div className="flex items-center">
                        <div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search City, Location"
                                className="border border-gray-400 rounded px-4 py-2"
                            />
                            <button onClick={getAllCompanies} className="ms-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Find Company
                            </button>
                            {/* Display your companies here */}
                        </div>
                    </div>
                    <button onClick={openModal} className=" whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ">
                        + Add Company
                    </button>
                    {/* <select className="border border-gray-400 rounded px-4 py-2">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */}
                </div>
                <hr className=' mt-5 mb-5 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-8'></hr>
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">

                    <main className="lg:col-span-12 xl:col-span-12">
                        <span>Result Found: {isAllCompanies?.length}</span>
                        <div className="mt-4">
                            <ul className="space-y-4">
                                {isAllCompanies?.map((list, index) => {
                                    let averageRating = list?.totalRating / list?.reviewCount;
                                    return (
                                        <li className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg" key={index}>
                                            <article aria-labelledby="question-title-81614">
                                                <div>
                                                    <div className="flex ">
                                                        <div className="flex-shrink-0">
                                                            <img width={100} src={list?.logo_url} alt="" />
                                                        </div>
                                                        <div className="min-w-0 flex-1 ml-5">
                                                            <h1 className="text-2xl font-medium text-gray-900">
                                                                <Link to="#" className="hover:underline">{list?.name}</Link>
                                                            </h1>
                                                            <p className="text-sm text-gray-500">
                                                                <Link to="#" className="hover:underline">
                                                                    <span >{list?.location} ,{list?.city}</span>
                                                                </Link>
                                                            </p>
                                                            <p className="flex mt-8 items-center">
                                                                {!isNaN(averageRating) &&
                                                                    <div className='me-2'>{parseFloat(averageRating).toFixed(1)}</div>
                                                                }
                                                                <ReactStars
                                                                    count={5}
                                                                    size={24}
                                                                    value={averageRating}
                                                                    activeColor="#ffd700"
                                                                    edit={false}
                                                                />
                                                                <div className='ms-2'> {list?.reviewCount} Reviews</div>
                                                            </p>
                                                        </div>
                                                        <div className="flex text-sm">
                                                            <span className="items-center text-sm">
                                                                Founded on {list?.founded}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" flex justify-between space-x-8">
                                                    <div className="flex space-x-6">
                                                    </div>
                                                    <div className="flex text-sm">
                                                        <span className="inline-flex items-center text-sm">
                                                            <Link to={`/review-details/${list?._id}`} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ">
                                                                Detail Review
                                                            </Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {isAllCompanies.length === 0 &&
                            <div className='text-center'>
                                <h2>No Company Found</h2>
                            </div>
                        }
                    </main>
                </div>
            </div>

            <div>
                {isOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-80">
                            <div className="bg-white rounded-lg shadow-lg p-6 mx-2" style={{ minWidth: "400px" }}>
                                <div className="mb-4 text-center">
                                    <h1 className="text-2xl font-semibold">Add Company</h1>
                                </div>
                                <form onSubmit={submitForm}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Company Name</label>
                                        <input required type="text" id="companyName" name="companyName" value={form.companyName}
                                            onChange={handleFormChange} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
                                        <input required type="text" id="location" name="location" value={form.location}
                                            onChange={handleFormChange} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="foundedOn" className="block text-gray-700 font-bold mb-2">Founded-On</label>
                                        <input required type="date" id="foundedOn" name="foundedOn" value={form.foundedOn}
                                            onChange={handleFormChange} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">City:</label>
                                        <input required type="text" id="city" name="city" value={form.city}
                                            onChange={handleFormChange} className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring" />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-6">

                                                <label htmlFor="city" className="block text-gray-700 font-bold mb-2">Company Logo:</label>
                                                {logoUrl ? (
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6">
                                                        <img src={logoUrl} alt="Company Logo" className="h-48 w-auto object-contain" />

                                                    </div>
                                                ) : (
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                                <span>Upload a logo</span>
                                                                <input required id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleLogo} />
                                                            </label>
                                                            {/* <p className="pl-1">or drag and drop</p> */}
                                                        </div>
                                                        {/* <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p> */}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
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
        </>
    );
};

export default CompanyCrud;