import { Container, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import axios from "axios";

const RelatedCerousel = (props) => {
  const [products, setProducts] = useState([]);

  const search = async (keyword, page) => {
    const response = await axios.get(
      `/api/search?keyword=${keyword}&page=${page}&order=DATE_DESC`
    );
    return response.data;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await search(props.keyword, 1);
      setProducts(data.products);
    };
    loadData();
  }, []);

  const settings = {
    dots: false,
    arrow: true,
    prevArrow: <ArrowBackIosNewRoundedIcon sx={{ color: "black" }} />,
    nextArrow: <ArrowForwardIosRoundedIcon sx={{ color: "black" }} />,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          dots: false,
          arrow: true,
          prevArrow: <ArrowBackIosNewRoundedIcon sx={{ color: "black" }} />,
          nextArrow: <ArrowForwardIosRoundedIcon sx={{ color: "black" }} />,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          dots: false,
          arrow: true,
          prevArrow: <ArrowBackIosNewRoundedIcon sx={{ color: "black" }} />,
          nextArrow: <ArrowForwardIosRoundedIcon sx={{ color: "black" }} />,
          infinite: true,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          dots: false,
          arrow: true,
          prevArrow: <ArrowBackIosNewRoundedIcon sx={{ color: "black" }} />,
          nextArrow: <ArrowForwardIosRoundedIcon sx={{ color: "black" }} />,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          arrow: true,
          prevArrow: <ArrowBackIosNewRoundedIcon sx={{ color: "black" }} />,
          nextArrow: <ArrowForwardIosRoundedIcon sx={{ color: "black" }} />,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Typography align="left" variant="h5" fontWeight="bold">
        관련 상품
      </Typography>
      <div align="right">
        <Typography
          display="inline"
          sx={{ mx: 1, cursor: "pointer" }}
          onClick={() => {
            window.location.replace(
              `/search?keyword=${props.keyword}&order=DATE_DESC`
            );
          }}
        >
          더보기
        </Typography>
      </div>
      <Divider sx={{ my: 2 }} />
      <Container>
        <Slider {...settings}>
          {products.map((product) => {
            return <ProductCard item={product} />;
          })}
        </Slider>
      </Container>
    </Container>
  );
};

export default RelatedCerousel;
