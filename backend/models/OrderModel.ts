import mongoose, { Schema } from "mongoose";

type ItemAndAmount = {
    idOfItem: string;
    Amount: number;
  }
interface IOrder {
  items: Array<ItemAndAmount>;
  name: string;
  adress: string;
  phone: string;
  note: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: Array<ItemAndAmount>, required: true },
    adress: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", schema);
