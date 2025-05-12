import api from '../api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Editshop() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateMessage, setUpdateMessage] = useState('');
    const [form, setForm] = useState({
        name: '',
        shop_address: '',
        product_category: '',
        product_price: ''
    });

    useEffect(() => {
        api.get(`/shop/${id}`)
            .then((res) => {
                const data = res.data;
                setForm({
                    name: data.name || '',
                    shop_address: data.shop_address || '',
                    product_category: data.product_category || '',
                    product_price: data.product_price || ''
                });
            })
            .catch((err) => 
                // console.log(err)
            err
        );
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        api.put(`/shop/${id}`, form)
            .then(() => {
                setUpdateMessage('Shop updated successfully!');
                setTimeout(() => setUpdateMessage(''), 3000);
                navigate('/');
            })
            .catch((err) => {
                setUpdateMessage("Something went wrong.");
                err;
                // console.error(err);
            });
    };

    return (
        <div className="container flex justify-center mt-9">
            <div className="w-6/12 h-[400px] overflow-y-auto border border-gray-300 rounded-lg pt-4">
                <h1 className='text-3xl px-5 my-2 text-slate-700'>Edit Your Shop here</h1>

                {updateMessage && <p className="text-green-600 px-5">{updateMessage}</p>}

                <input
                    name="name"
                    value={form.name}
                    placeholder="Name"
                    onChange={handleChange}
                    className="border border-gray-400 px-4 py-2 rounded-lg w-11/12 mx-4 mt-4"
                />
                <input
                    name="shop_address"
                    value={form.shop_address}
                    placeholder="Address"
                    onChange={handleChange}
                    className="border border-gray-400 px-4 py-2 rounded-lg w-11/12 mx-4 mt-4"
                />
                <input
                    name="product_category"
                    value={form.product_category}
                    placeholder="Category"
                    onChange={handleChange}
                    className="border border-gray-400 px-4 py-2 rounded-lg w-11/12 mx-4 mt-4"
                />
                <input
                    name="product_price"
                    value={form.product_price}
                    placeholder="Price"
                    onChange={handleChange}
                    className="border border-gray-400 px-4 py-2 rounded-lg w-11/12 mx-4 mt-4"
                />
                <br />
                <button
                    onClick={handleSubmit}
                    className="py-2 px-4 border-none bg-green-500 text-white rounded-lg text-[16px] mt-3 mx-5"
                >
                    Submit
                </button>
                <Link to="/">
                    <button className="py-2 px-4 border-none bg-red-500 text-white rounded-lg text-[16px] mx-2 mt-3">
                        Cancel
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Editshop;
