import { Backdrop, Divider, Typography, CircularProgress } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const PriceBox = (props) => {
  const getPrice = async (keyword) => {
    const response = await axios.get(`/api/price?keyword=${keyword}`);

    return response.data;
  };

  const [progress, setProgress] = useState(false);
  const [price, setPrice] = useState({
    aMonthAgo: { price: 0, num: 0 },
    twoMonthAgo: { price: 0, num: 0 },
    threeMonthAgo: { price: 0, num: 0 },
    fourMonathAgo: { price: 0, num: 0 },
  });

  const labels = ["3개월 전", "2개월 전", "1개월 전", "최근 한달"];

  useEffect(() => {
    const loadData = async () => {
      setProgress(true);
      const data = await getPrice(props.keyword);
      console.log(data);
      setPrice(data);
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
      <Container sx={{ my: 4 }}>
        <Line
          option={{ responsive: true }}
          data={{
            labels,
            datasets: [
              {
                type: "line",
                label: "평균 거래가",
                data: [
                  Math.floor(
                    price.fourMonathAgo.price / price.fourMonathAgo.num
                  ),
                  Math.floor(
                    price.threeMonthAgo.price / price.threeMonthAgo.num
                  ),
                  Math.floor(price.twoMonthAgo.price / price.twoMonthAgo.num),
                  Math.floor(price.aMonthAgo.price / price.aMonthAgo.num),
                ],
                borderColor: "rgb(81, 45, 168)",
                backgroundColor: "rgb(81, 45, 168)",
              },
            ],
          }}
        />
        <Typography variant="h6">
          최근 <strong>'{props.keyword}'</strong>의 평균 거래 금액은
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >{`${Math.floor(price.aMonthAgo.price / price.aMonthAgo.num)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</Typography>
      </Container>
    </Container>
  );
};

export default PriceBox;
