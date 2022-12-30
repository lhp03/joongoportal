import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <Container sx={{ flexGrow: 1, my: 2, p: 0, mt: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer", ml: 2 }}
            onClick={() => {
              window.location.replace("/");
            }}
          >
            중고모아
          </Typography>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              window.location.replace("/search");
            }}
          >
            검색
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: "bold" }}
            onClick={() => {
              window.location.replace("/price");
            }}
          >
            시세확인
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
