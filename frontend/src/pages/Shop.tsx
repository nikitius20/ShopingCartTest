import {
  Stack,
  Box,
  styled,
  Typography,
  Button,
  Card,
  CardMedia,
  Alert,
  CardContent,
  CardActions,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Item } from "../../types";

export interface IShopProps {}

const api = Axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

const Shop: React.FunctionComponent<IShopProps> = (props) => {
  const [shops, setShops] = useState<Array<string>>([""]);
  const [items, setItems] = useState<Array<Item>>([]);
  const [currentShop, setCurrentShop] = useState<string | undefined>();
  const [orderList, setOrderList] = useState<Array<string>>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  useEffect(() => {
    const localOrder = window.localStorage.getItem("order");

    if (localOrder) {
      setOrderList(JSON.parse(localOrder));
    }

    if (!currentShop) {
      api.get("/shops").then((res) => {
        setShops(res.data);
      });
      api.get("/allItems").then((res) => {
        setItems(res.data);
      });
    } else {
      api.get(`/items?shop=${currentShop}`).then((res) => {
        setItems(res.data);
      });
    }
  }, [currentShop]);

  function handleOrder(id: string) {
    if (orderList.includes(id)) {
      setSnackbarOpen(true);
    } else {
      const updatedOrder = [...orderList];
      updatedOrder.push(id);
      setOrderList(updatedOrder);
      window.localStorage.setItem("order", JSON.stringify(updatedOrder));
    }
  }

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const ShopsMenu = styled(Stack)({
    borderRight: "5px solid blue",
    flex: 1,
    height: "100%",
    gap: "10px",
    alignItems: "center",
    padding: "50px 0",
    boxSizing: "border-box",
  });
  const ShopsItem = styled(Button)({
    width: "80%",
    padding: "5px 0",
    textAlign: "center",
  });
  const ItemsMenu = styled(Stack)({
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "50px 0",
    gap: "30px",
  });

  return (
    <Stack direction="row">
      <ShopsMenu>
        <ShopsItem
          key={-1}
          variant="contained"
          onClick={() => {
            setCurrentShop("");
          }}
        >
          <Typography>All</Typography>
        </ShopsItem>
        {shops.map((el, index) => (
          <ShopsItem
            key={index}
            variant="contained"
            onClick={() => {
              setCurrentShop(el);
            }}
          >
            <Typography>{el}</Typography>
          </ShopsItem>
        ))}
      </ShopsMenu>
      <ItemsMenu flex={3} direction="row">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          sx={{}}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{
              width: "70%",
              position: "fixed",
              top: "50px",
              left: "15%",
            }}
          >
            Item Already in the cart
          </Alert>
        </Snackbar>
        {items.map((el, index) => (
          <Card key={index} sx={{ width: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={el.image}
              alt={el.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {el.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  handleOrder(el._id);
                }}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </ItemsMenu>
    </Stack>
  );
};

export default Shop;
