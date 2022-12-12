import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Searchbar from "../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";

const MainPage = () => {
  return (
    <Container align="center">
      <Searchbar />
      <Container sx={{ my: 5 }}>
        <SearchIcon sx={{ fontSize: 200, color: "lightgray" }} />
        <Typography
          align="center"
          variant="h3"
          sx={{ color: "lightgray", fontWeight: "bold" }}
        >
          중고 상품을 통합 검색해보세요.
        </Typography>
      </Container>
    </Container>
  );
};

export default MainPage;
