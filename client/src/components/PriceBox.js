import { Backdrop, Divider, Typography, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PriceBox = (props) => {
  const getPrice = async (keyword) => {
    const response = await axios.get(`/api/price?keyword=${keyword}`);

    return response.data;
  };

  const [progress, setProgress] = useState(false);
  const [price, setPrice] = useState(0);
  const [num, setNum] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setProgress(true);
      const data = await getPrice(props.keyword);
      setPrice(data.price);
      setNum(data.num);
      setProgress(false);
    };

    loadData();
  }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography align="left" variant="h5" fontWeight="bold">
        분석 결과
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Backdrop
        sx={{
          color: "#fff",
        }}
        open={progress}
      >
        <CircularProgress sx={{ color: "#e0e0e0" }} />
      </Backdrop>
      <Typography
        align="center"
        variant="h3"
        sx={{ color: "lightgray", fontWeight: "bold" }}
      >
        총 {num} 개의
      </Typography>
      <Typography
        align="center"
        variant="h3"
        sx={{ color: "lightgray", fontWeight: "bold" }}
      >
        상품 가격을 확인한 결과
      </Typography>
      <Typography
        align="center"
        variant="h3"
        sx={{ color: "lightgray", fontWeight: "bold" }}
      >
        {props.keyword}의
      </Typography>
      <Typography
        align="center"
        variant="h3"
        sx={{ color: "lightgray", fontWeight: "bold" }}
      >
        적정 가격은{" "}
        {(price / num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
        입니다.
      </Typography>
    </Container>
  );
};

export default PriceBox;
