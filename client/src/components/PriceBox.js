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

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "평균 거래가",
        data: [734250, 889681, 703330, 734250],
        borderColor: "rgb(81, 45, 168)",
        backgroundColor: "rgb(81, 45, 168)",
      },
    ],
  };

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
      <Line
        option={{ responsive: true }}
        data={{
          labels,
          datasets: [
            {
              type: "line",
              label: "평균 거래가",
              data: [
                price.fourMonathAgo.price,
                price.threeMonthAgo.price,
                price.twoMonthAgo.price,
                price.aMonthAgo.price,
              ],
              borderColor: "rgb(81, 45, 168)",
              backgroundColor: "rgb(81, 45, 168)",
            },
          ],
        }}
      />
    </Container>
  );
};

export default PriceBox;
