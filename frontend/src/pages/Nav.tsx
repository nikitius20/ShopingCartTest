import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box, styled, Typography, Button } from "@mui/material";

export interface INavProps {}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const ButtonMenu = styled(Button)({
    padding: "10px 30px",
    textAlign: "center",
    border: "3px solid blue",
    color: "blue",
  });
  const LinkMenu = styled(Link)({
    textDecoration: "none",
    fontWeight: "bold",
  });
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        padding: "15px 20px",
      }}
    >
      <LinkMenu to="shop">
        <ButtonMenu>
          <Typography>Shop</Typography>
        </ButtonMenu>
      </LinkMenu>
      <LinkMenu to="cart">
        <ButtonMenu>
          <Typography>Cart</Typography>
        </ButtonMenu>
      </LinkMenu>
    </Stack>
  );
};

export default Nav;
