import express from "express";
import Item from "express";
import ItemController from "../controllers/ItemController";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.get("/item", ItemController.getItem);
router.get("/items", ItemController.getItemsByShop);
router.get("/itemsById", ItemController.getItemsById);
router.get("/allItems", ItemController.getAllItems);
router.post("/item", ItemController.addItem);
router.get("/shops", ItemController.getShops);
router.post("/order", OrderController.addOrder);

export default router;
