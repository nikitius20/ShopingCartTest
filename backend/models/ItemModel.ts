import mongoose, { Schema } from "mongoose";

interface IItem {
  name: string;
  price: number;
  image: string;
  shop: string;
  description: string;
}

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    shop: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IItem>("Item", schema);
