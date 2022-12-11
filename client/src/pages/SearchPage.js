import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CafeProductList from "../components/CafeProductList";
import Searchbar from "../components/Searchbar";
import BunjangProductList from "../components/BunjangProductList";
import HelloMarketProductList from "../components/HelloMarketProductList";

const SearchPage = () => {
  const { keyword } = useParams();
  console.log(keyword);

  return (
    <Container align="center" sx={{ m: 2 }}>
      <Searchbar value={keyword} />
      <Container maxWidth="lg">
        <CafeProductList keyword={keyword}></CafeProductList>
      </Container>
      <Container maxWidth="lg">
        <BunjangProductList keyword={keyword}></BunjangProductList>
      </Container>
      <Container maxWidth="lg">
        <HelloMarketProductList keyword={keyword}></HelloMarketProductList>
      </Container>
    </Container>
  );
};

export default SearchPage;
