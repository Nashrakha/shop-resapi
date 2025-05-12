import shopModel from "../models/shop.js"
class ShopController {
    //create shop 
    static createShop = async (req, res) => {
        try {
            const { name, shop_address, product_category, product_price } = req.body;
            const doc = new shopModel({
                name: name, shop_address: shop_address, product_category: product_category, product_price: product_price,
            })
            const result = await doc.save();
            console.log(result)
            res.send(result)
        } catch (error) {
            console.log(error);
        }
    };

    //Get all shop data
    static getAllShop = async (req, res) => {
        try {
            const allShop = await shopModel.find();
            res.send(allShop)
        } catch (error) {
            console.log(error.message)
        }
    };

    //get by id shop data
    static getsingleShopById = async (req, res) => {
        try {
            const result = await shopModel.findById(req.params.id);
            if (!result) {
                res.status(404).send({ message: "shop not exits" })
            }
            res.status(200).send({ message: "shop getsingleShopById", result })
        } catch (error) {
            console.log(error.message)
        }

    };

    // shop update by id 
    static updateShopById = async (req, res) => {
        try {
            const updateData = req.body;
            const id = req.params.id;
            const result = await shopModel.findByIdAndUpdate(id, updateData);
            if (!result) {
                res.status(404).send({ message: "shop not exits or already deleted" })
            }
            res.status(200).send({ message: "shop update successfully", result })

        } catch (error) {
            console.log(error.message)
        }
    };

    // shop delte by id 
    static deleteShopById = async (req, res) => {
        try {
            const result = await shopModel.findByIdAndDelete(req.params.id)
            if (!result) {
                res.status(404).send({ message: "shop already deleted" })
            }
            res.status(200).send('Shop Delete successfully', result)
        } catch (error) {
            console.log(error.message)
        }
    };

    static async partialUpdateShop(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Update data is required" });
            }

            const updateShop = await shopModel.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!updateShop) {
                return res.status(404).json({ message: "Shop not found" });
            }

            res.json(updateShop);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }


}
export default ShopController;