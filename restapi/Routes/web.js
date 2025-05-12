import express from 'express'
import ShopController from '../controller/shopController.js';
const router = express.Router();
//creating riutes
router.get('/', ShopController.getAllShop)
router.post('/', ShopController.createShop)
router.get('/:id', ShopController.getsingleShopById)
router.put('/:id', ShopController.updateShopById)
router.delete('/:id', ShopController.deleteShopById)
router.patch('/:id', ShopController.partialUpdateShop)

export default router;