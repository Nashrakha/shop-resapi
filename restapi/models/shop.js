import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    shop_address: {
        type: String,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        validate: {
            validator: function (value) {
                return parseFloat(value.toString()) >= 499;
            },
            message: "Product price must be at least 499."
        }
    },

});

// Model
const shopModel = mongoose.model('shop', shopSchema);
export default shopModel;
