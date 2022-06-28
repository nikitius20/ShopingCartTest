export type Item = {
  _id: any;
  name: string;
  price: number;
  image: string;
  shop: string;
  description: string;
};

export type ItemAndAmount = {
  id: string;
  amount: number;
};

export type Order = {
  items: Array<ItemAndAmount>;
  name: string;
  adress: string;
  phone: string;
  note: string;
};
