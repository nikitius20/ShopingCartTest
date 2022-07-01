import React, { useEffect, useState } from "react";
import { Order, Item } from "../../types";
import {
  Stack,
  Box,
  styled,
  TextField,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export interface ICartProps {}

const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const Cart: React.FunctionComponent<ICartProps> = (props) => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [order, setOrder] = useState<Order>({
    items: [],
    name: "",
    adress: "",
    phone: "",
    note: "",
  });

  const [name, setName] = useState<string>("");
  const [adress, setAdress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const localOrder = window.localStorage.getItem("order");
    if (localOrder) {
      setOrderList(JSON.parse(localOrder));
    }
  }, []);

  useEffect(() => {
    if (orderList.length) {
      window.localStorage.setItem("order", JSON.stringify(orderList));
      const unique = orderList.filter((item, index) => {
        return orderList.indexOf(item) === index;
      });

      const itemAndAmmount: { id: string; amount: number }[] = [];
      unique.forEach((el) => {
        itemAndAmmount.push({ id: el, amount: 1 });
      });
      const newOrder = { ...order };
      newOrder.items = [...itemAndAmmount];
      setOrder(newOrder);

      let queryText = "";
      unique.forEach((el) => {
        queryText += `&id=${el}`;
      });
      api.get(`/itemsById?${queryText}`).then((res: { data: any }) => {
        setItems(res.data);
      });
    }
  }, [orderList]);

  function handleDelete(index: number) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    const newOrderList = [...orderList];
    newOrderList.splice(index, 1);
    setOrderList(newOrderList);
    const newOrder = { ...order };
    newOrder.items.splice(index, 1);
    setOrder(newOrder);
  }
  function handleSendOrder() {
    const newOrder = {
      ...order,
      name: name,
      adress: adress,
      phone: phone,
      note: note,
    };
    api.post(`/order`, newOrder).then((res: { data: any }) => {
      window.localStorage.removeItem("order");
      navigate("/shop");
    });
  }
  const ItemsInCart = styled(Stack)({
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "50px 0",
    gap: "10px",
    alignItems: "center",
    width: "60vw",
  });

  return (
    <Stack direction="row">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          width: "40vw",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px 0",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" component="span" sx={{ textAlign: "center" }}>
          Fill the oreder form
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Adress"
          variant="outlined"
          value={adress}
          onChange={(event) => {
            setAdress(event.target.value);
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Note"
          multiline
          maxRows={4}
          variant="outlined"
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
          }}
        />
        <Button size="large" variant="contained" onClick={handleSendOrder}>
          Create Order
        </Button>
      </Box>
      <ItemsInCart>
        {items.length ? (
          items.map((el, index) => (
            <Card
              key={index}
              sx={{ width: "80%", height: "250px", display: "flex" }}
            >
              <CardMedia
                component="img"
                height="100%"
                sx={{
                  width: "50%",
                }}
                image={el.image}
                alt={el.name}
              />
              <Stack
                sx={{ justifyContent: "space-between", padding: "10px 0" }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {el.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                  }}
                >
                  <TextField
                    sx={{
                      width: "30%",
                    }}
                    type="number"
                    value={order.items[index].amount}
                    onChange={(event) => {
                      const newOrder = { ...order };
                      if (Number(event.target.value) > 1) {
                        newOrder.items[index].amount = Number(
                          event.target.value
                        );
                      } else {
                        newOrder.items[index].amount = 1;
                      }
                      setOrder(newOrder);
                    }}
                  />
                  <Button
                    size="small"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    Remove From cart
                  </Button>
                </CardActions>
              </Stack>
            </Card>
          ))
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            You have no items in a cart
          </Typography>
        )}
      </ItemsInCart>
    </Stack>
  );
};

export default Cart;
