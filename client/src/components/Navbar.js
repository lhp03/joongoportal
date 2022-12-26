import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import React from "react";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, my: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            중고모아
          </Typography>
          <Button color="inherit">검색</Button>
          <Button color="inherit">시세확인</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
