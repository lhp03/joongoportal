import { Container } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

const data = [
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/210063895",
    img_url:
      "https://media.bunjang.co.kr/product/210063895_1_1672546842_w{res}.jpg",
    title: "아이폰 XR 64gb 화이트",
    date: 1672569460000,
    price: "220000",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰 아이폰xr 애플 화이트",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/210122506",
    img_url:
      "https://media.bunjang.co.kr/product/210122506_1_1672569435_w{res}.jpg",
    title: "갤럭시 s22 울트라 화이트 ->->아이폰 13프로 스페이스그레이",
    date: 1672569435000,
    price: "12345678",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰13프로 s22울트라 교환 갤럭시s급 그래파이트",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/210043875",
    img_url:
      "https://media.bunjang.co.kr/product/210043875_1_1672536364_w{res}.jpg",
    title: "아이폰 x 팝니다",
    date: 1672569425000,
    price: "200000",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰x 아이폰",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/209693654",
    img_url:
      "https://media.bunjang.co.kr/product/209693654_1_1672169324_w{res}.jpg",
    title: "아이폰 12미니 64gb 화이트",
    date: 1672569401000,
    price: "280000",
    state: "ON_SALE",
    used: "NEW",
    tag: "",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/208398939",
    img_url:
      "https://media.bunjang.co.kr/product/208398939_1_1672321052_w{res}.jpg",
    title: "아이폰 12미니 배터리85",
    date: 1672569398000,
    price: "320000",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰 아이폰12미니 아이폰12 아이폰미니",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/209768605",
    img_url:
      "https://media.bunjang.co.kr/product/209768605_1_1672389261_w{res}.jpg",
    title: "아이폰 13 미니 핑크 128GB",
    date: 1672569397000,
    price: "600000",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰 애플 중고폰 스마트폰 아이폰13미니",
  },
  {
    from: "BJ",
    url: "https://m.bunjang.co.kr/products/105097105",
    img_url:
      "https://media.bunjang.co.kr/product/105097105_1_1666013252_w{res}.jpg",
    title: "럭키슈에뜨 아이폰",
    date: 1672569375000,
    price: "7000",
    state: "ON_SALE",
    used: "NEW",
    tag: "아이폰7케이스 아이폰 럭키슈에뜨 럭키슈에뜨폰케이스 아이폰케이스",
  },
];

const RelatedCerousel = () => {
  const [products, setProducts] = useState(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Container component={"div"} sx={{ display: "inline-block" }}>
      <Slider {...settings}>
        {products.map((product) => {
          return <ProductCard item={product} />;
        })}
      </Slider>
    </Container>
  );
};

export default RelatedCerousel;
