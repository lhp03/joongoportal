import { Container, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import PriceBox from "../components/PriceBox";
import Searchbar from "../components/Searchbar";
import SearchIcon from "@mui/icons-material/Search";

const PricePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return (
    <div align="center">
      <Searchbar value={keyword} link="price" />
      {keyword != null && keyword != undefined ? (
        <PriceBox keyword={keyword} />
      ) : (
        <Container sx={{ my: 5 }}>
          <SearchIcon sx={{ fontSize: 200, color: "lightgray" }} />
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            중고 상품을
          </Typography>
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            통합 검색해보세요.
          </Typography>
        </Container>
      )}
    </div>
  );
};

export default PricePage;
