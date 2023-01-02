import { Container, Divider, Typography } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";
import PriceBox from "../components/PriceBox";
import Searchbar from "../components/Searchbar";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RelatedCerousel from "../components/RelatedCerousel";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";

const PricePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return (
    <Container align="center">
      <Container>
        <Typography align="left" variant="h5" fontWeight="bold">
          시세 확인
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Container>
      <Searchbar value={keyword} link="price" />
      {keyword !== null && keyword !== undefined ? (
        <>
          <PriceBox keyword={keyword} />
          <RelatedCerousel keyword={keyword} />
        </>
      ) : (
        <Container sx={{ my: 5 }}>
          <AttachMoneyIcon sx={{ fontSize: 200, color: "lightgray" }} />
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            중고 상품의
          </Typography>
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            가격을 확인해보세요.
          </Typography>
        </Container>
      )}
    </Container>
  );
};

export default PricePage;
