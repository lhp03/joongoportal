import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Searchbar from "../components/Searchbar";

const MainPage = () => {
  return (
    <Container align="center">
      <Searchbar />
      <Typography align="center" variant="h3" sx={{ color: "lightgray" }}>
        중고 상품을 한번에 검색해보세요.
      </Typography>
    </Container>
  );
};

export default MainPage;
