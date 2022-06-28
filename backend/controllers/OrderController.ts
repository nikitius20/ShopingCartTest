import { Response, Request } from "express";
import Order from "../models/OrderModel";

const ItemController = {
  async addOrder(req: Request, res: Response) {
    try {
      const { adress, items, name, note, phone } = req.body;
      const newOrder = new Order({
        name: name,
        adress: adress,
        note: note,
        phone: phone,
        items: items,
      });

      await newOrder.save();

      return res.status(200).json(newOrder);
    } catch (err: any) {
      return res.status(500).json(err);
    }
  },
};
export default ItemController;
