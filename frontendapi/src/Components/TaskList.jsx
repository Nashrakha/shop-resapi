import { useEffect, useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom';
import api from '../api';
function TaskList() {
    const [shops, setShops] = useState([])
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [form, setForm] = useState({
        name: '',
        shop_address: '',
        product_category: '',
        product_price: ''
    })

    useEffect(() => {
        fetchShops()
    }, [])

    useEffect(() => {
        if (successMessage || deleteMessage || updateMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setDeleteMessage('');
                setUpdateMessage('');
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [successMessage, deleteMessage, updateMessage]);

    const fetchShops = async () => {
        try {
            const response = await api.get('/shop/');
            setShops(response.data);
        } catch (error) {
            // (error);
            error
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            })
        }
    }

    const validateForm = () => {
        const newErrors = {};
        if (!form.name || form.name.trim().length < 3) {
            newErrors.name = 'Name must be at least 3 characters';
        }
        if (!form.shop_address) {
            newErrors.shop_address = 'Shop address is required';
        }
        if (!form.product_category) {
            newErrors.product_category = 'Product category is required';
        }
        if (!form.product_price || isNaN(form.product_price) || parseFloat(form.product_price) < 500) {
            newErrors.product_price = 'Product price must be at least 500';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await api.post('/shop/', form);
            setSuccessMessage('Shop added successfully');
            setForm({
                name: '',
                shop_address: '',
                product_category: '',
                product_price: ''
            });
            fetchShops();
        } catch (err) {
            // (err);
            err;
            setSuccessMessage("Something went wrong.");
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/shop/${id}`);
            setDeleteMessage('Shop deleted successfully');
            fetchShops();
        } catch (err) {
            // (err);
            err;
            setDeleteMessage("Something went wrong.");
        }
    }

    return (
        <div className="container-fluid">
            <div className="w-full flex px-10">
                <div className="w-6/12 mt-5">
                    <h1 className='text-orange-400 text-3xl font-sans capitalize px-4'>Add New Shop Here</h1>
                    {successMessage && <div className='alert alert-success'>{successMessage}</div>}
                    {deleteMessage && <div className='alert alert-danger'>{deleteMessage}</div>}
                    {updateMessage && <div className='alert alert-success'>{updateMessage}</div>}

                    <div className="px-5">
                        <input
                            name='name'
                            value={form.name}
                            placeholder='Name'
                            className='px-3 border border-black rounded-lg w-full py-3 mt-4'
                            onChange={handleChange}
                        />
                        {errors.name && <small className="text-red-500 block">{errors.name}</small>}

                        <input
                            name='shop_address'
                            value={form.shop_address}
                            placeholder='Address'
                            className='px-3 border border-black rounded-lg w-full py-3 mt-4'
                            onChange={handleChange}
                        />
                        {errors.shop_address && <small className="text-red-500 block">{errors.shop_address}</small>}

                        <input
                            name='product_category'
                            value={form.product_category}
                            placeholder='Category'
                            className='px-3 border border-black rounded-lg w-full py-3 mt-4'
                            onChange={handleChange}
                        />
                        {errors.product_category && <small className="text-red-500 block">{errors.product_category}</small>}

                        <input
                            name='product_price'
                            value={form.product_price}
                            placeholder='Price'
                            className='px-3 border border-black rounded-lg w-full py-3 mt-4'
                            onChange={handleChange}
                        />
                        {errors.product_price && <small className="text-red-500 block">{errors.product_price}</small>}

                        <button
                            onClick={handleSubmit}
                            className='bg-green-400 hover:bg-green-500 text-white py-3 px-5 border-none rounded-lg mt-7'
                        >
                            Add Shop
                        </button>
                    </div>
                </div>

                <div className="w-6/12 mt-5">
                    <h1 className="text-orange-400 text-3xl font-sans capitalize px-2 mb-4">All shops will display here</h1>

                    <div className="h-[400px] overflow-y-auto border border-gray-300 rounded-lg">
                        {/* <div className='flex justify-between items-center px-3 fixed top-0'>
                            <select name="" id="" className='border-double border-slate-500 rounded-lg'>
                                <option value="">Name</option>
                                <option value="">-Name</option>
                                <option value="">Price</option>
                                <option value="">-Price</option>
                            </select>
                            <input type="text" placeholder='Seacrh Name' className='py-2 m-2 px-3 w-2/4 border border-slate-400 rounded-lg' />
                        </div> */}
                        <table className="min-w-full">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">Id</th>
                                    <th className="border border-gray-400 px-4 py-2">Name</th>
                                    <th className="border border-gray-400 px-4 py-2">Address</th>
                                    <th className="border border-gray-400 px-4 py-2">Category</th>
                                    <th className="border border-gray-400 px-4 py-2">Price</th>
                                    <th className="border border-gray-400 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shops.length === 0 ? (
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2 text-center" colSpan={6}>No data found</td>
                                    </tr>
                                ) : (
                                    shops.map((shop, index) => (
                                        <tr key={shop._id}>
                                            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-400 px-4 py-2">{shop.name}</td>
                                            <td className="border border-gray-400 px-4 py-2">{shop.shop_address}</td>
                                            <td className="border border-gray-400 px-4 py-2">{shop.product_category}</td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                {typeof shop.product_price === 'object' && shop.product_price?.$numberDecimal
                                                    ? `₹${parseFloat(shop.product_price.$numberDecimal).toFixed(2)}`
                                                    : `₹${shop.product_price}`}
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <Link
                                                        to={`/edit/${shop._id}`}
                                                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                                                        onClick={() => handleDelete(shop._id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskList