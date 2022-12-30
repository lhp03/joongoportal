import { Container } from "@mui/material";
import React from "react";
import Feed from "../components/Feed";
import Searchbar from "../components/Searchbar";

const MainPage = () => {
  return (
    <Container align="center">
      <Feed />
    </Container>
  );
};

export default MainPage;
