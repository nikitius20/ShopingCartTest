import React from "react";
import Shop from "./pages/Shop";
import Nav from "./pages/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { Stack, Box } from "@mui/material";

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Router>
      <Stack direction="column">
        <Box bgcolor="lightblue" flex={1}>
          <Nav />
        </Box>
        <Box flex={10}>
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>
      </Stack>
    </Router>
  );
};

export default App;
