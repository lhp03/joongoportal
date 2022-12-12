import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const BunjangProductCard = (props) => {
  const getTimeDiff = (timestamp) => {
    const diff = Math.floor((Math.floor(Date.now() / 1000) - timestamp) / 60);

    if (diff < 1) return "방금 전";
    if (diff < 60) return `${diff}분 전`;

    const diff_hour = Math.floor(diff / 60);
    if (diff_hour < 24) return `${diff_hour}시간 전`;

    const diff_day = Math.floor(diff / 60 / 24);
    if (diff_day < 365) return `${diff_day}일 전`;

    return `${Math.floor(diff_day / 365)}년 전`;
  };

  return (
    <Card
      sx={{
        overflow: "hidden",
        m: 1,
        textOverflow: "ellipsis",
        ":hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => window.open(props.product.link)}
    >
      <CardMedia
        component="img"
        height="200"
        image={props.product.product_image}
      />
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold" }}
          noWrap
          gutterBottom
          variant="body1"
          component="div"
          align="left"
        >
          {props.product.title}
        </Typography>
        <Typography align="left" variant="body1">
          {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </Typography>
        <Typography align="left" noWrap variant="body2" color="text.secondary">
          위치: {props.product.location}
        </Typography>
        <Typography align="left" noWrap variant="body2" color="text.secondary">
          태그: {props.product.tag}
        </Typography>
        <Typography align="right" variant="body2">
          {getTimeDiff(props.product.update_time)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BunjangProductCard;
