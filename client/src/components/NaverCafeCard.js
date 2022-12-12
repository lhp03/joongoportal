import { Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NaverCafeCard = (props) => {
  const getTimeDiff = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000 / 60);

    if (diff < 1) return "방금 전";
    if (diff < 60) return `${diff}분 전`;

    const diff_hour = Math.floor(diff / 60);
    if (diff_hour < 24) return `${diff_hour}시간 전`;

    const diff_day = Math.floor(diff / 60 / 24);
    if (diff_day < 365) return `${diff_day}일 전`;

    return `${Math.floor(diff_day / 365)}년 전`;
  };

  const getLink = () => {
    return `https://cafe.naver.com/${props.product.item.cafeUrl}/${props.product.item.articleId}`;
  };
  return (
    <Card
      sx={{
        overflow: "hidden",
        m: 1,
        p: 1,
        textOverflow: "ellipsis",
        ":hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => window.open(getLink())}
    >
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <Container sx={{ m: 0, my: 2 }}>
            <Typography
              sx={{ fontWeight: "bold" }}
              noWrap
              gutterBottom
              variant="body1"
              component="div"
              align="left"
            >
              {props.product.item.subject}
            </Typography>
            <Typography align="left" noWrap variant="body1">
              {props.product.item.productSale.cost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </Typography>
            <Typography
              align="left"
              noWrap
              variant="body2"
              color="text.secondary"
            >
              [
              {props.product.item.productSale.saleStatus === "ON_SALE"
                ? "판매중"
                : props.product.item.productSale.saleStatus === "RESERVED"
                ? "예약중"
                : props.product.item.productSale.saleStatus === "COMPLETED"
                ? "판매완료"
                : props.product.item.productSale.saleStatus}
              ]
            </Typography>
            <Typography
              align="left"
              noWrap
              variant="body2"
              color="text.secondary"
            >
              {props.product.item.productSale.productCondition === "NEW" ? (
                "새상품"
              ) : props.product.item.productSale.productCondition ===
                "ALMOST_NEW" ? (
                "거의 새 것"
              ) : props.product.item.productSale.productCondition === "USED" ? (
                "사용감 있음"
              ) : (
                <>&nbsp;</>
              )}
            </Typography>
            <Box sx={{ height: "100%" }} />
            <Typography
              align="left"
              noWrap
              variant="body2"
              color="text.secondary"
              sx={{ float: "right" }}
            >
              {getTimeDiff(props.product.item.writeTime)}
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={5}>
          <CardMedia
            component="img"
            referrerPolicy="no-referrer"
            image={props.product.item.thumbnailImageUrl}
            height="140"
            width="140"
            sx={{ margin: 1 }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default NaverCafeCard;
