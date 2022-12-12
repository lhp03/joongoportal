import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const HelloMarketProductCard = (props) => {
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
          [{props.product.status}] {props.product.usedType}
        </Typography>
        <Typography variant="body2" align="right">
          {props.product.timeago}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HelloMarketProductCard;
