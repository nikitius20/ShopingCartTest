import { Response, Request } from "express";
import Item from "../models/ItemModel";

const ItemController = {
  async addItem(req: Request, res: Response) {
    try {
      const { name, price, image, description, shop } = req.body;
      const newItem = new Item({
        name: name,
        price: price,
        image: image,
        shop: shop,
        description: description,
      });
      await newItem.save();

      return res.status(200).json({ newItem });
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
  async getItem(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const item = await Item.findById(id);
      if (!item) {
        res.statusMessage = "Item Not Found";
        return res.status(400);
      }

      return res.status(200).json(item);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
  async getItemsById(req: Request, res: Response) {
    try {
      const id = req.query.id as string[];
      if (!id) {
        res.statusMessage = "No ID";
        return res.status(400);
      }
      const listOfIems = await Item.find().where("_id").in(id).exec();

      return res.status(200).json(listOfIems);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
  async getAllItems(req: Request, res: Response) {
    try {
      const items = await Item.find();
      if (!items) {
        res.statusMessage = "Items Not Found";
        return res.status(400);
      }

      return res.status(200).json(items);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
  async getItemsByShop(req: Request, res: Response) {
    try {
      const params = req.query;
      const items = await Item.find(params);
      if (!items) {
        res.statusMessage = "Items Not Found";
        return res.status(400);
      }

      return res.status(200).json(items);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
  async getShops(req: Request, res: Response) {
    try {
      const shops = await Item.find().distinct("shop");
      if (!shops) {
        res.statusMessage = "Shops Not Found";
        return res.status(400);
      }

      return res.status(200).json(shops);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
};
export default ItemController;
