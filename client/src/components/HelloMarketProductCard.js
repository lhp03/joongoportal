import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const HelloMarketProductCard = (props) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        overflow: "hidden",
        m: 2,
        textOverflow: "ellipsis",
        ":hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => window.open(props.product.link)}
    >
      <CardMedia
        component="img"
        height="250"
        image={props.product.product_image}
      />
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold" }}
          noWrap
          gutterBottom
          variant="body1"
          component="div"
        >
          {props.product.title}
        </Typography>
        <Typography variant="body1">
          {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
