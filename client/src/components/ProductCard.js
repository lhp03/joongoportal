import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import React from "react";

const ProductCard = (props) => {
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

  return (
    <Card
      elevation={2}
      sx={{
        maxWidth: 300,
        maxHeight: 450,
        px: 2,
        py: 1,
        overflow: "hidden",
        m: 1,
        textOverflow: "ellipsis",
        ":hover": {
          boxShadow: 6,
        },
      }}
      onClick={() => window.open(props.item.url)}
    >
      <CardMedia
        referrerPolicy="no-referrer"
        component="img"
        height="180"
        width="180"
        image={
          props.item ? (
            props.item.img_url
          ) : (
            <ImageNotSupportedIcon></ImageNotSupportedIcon>
          )
        }
      ></CardMedia>
      <CardContent sx={{ p: 0, py: 1 }}>
        <Stack direction="row" spacing={1} my={1}>
          {props.item.state === "RESERVED" ? (
            <Chip
              label="예약중"
              size="small"
              sx={{
                backgroundColor: "#ffeb3b",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ) : props.item.state === "COMPLETED" ? (
            <Chip
              label="판매완료"
              size="small"
              sx={{
                backgroundColor: "#f44336",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ) : (
            <Chip
              label="판매중"
              size="small"
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
          {props.item.used === "NEW" ? (
            <Chip
              label="새상품"
              size="small"
              sx={{
                backgroundColor: "#2196f3",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ) : props.item.used === "ALMOST_NEW" ? (
            <Chip
              label="거의 새것"
              size="small"
              sx={{
                backgroundColor: "#009688",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ) : props.item.used === "USED" ? (
            <Chip
              label="중고"
              size="small"
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                fontWeight: "bold",
              }}
            />
          ) : (
            <></>
          )}
        </Stack>
        <Typography noWrap align="left" variant="body1">
          {props.item ? props.item.title : "Title"}
        </Typography>
        <Typography noWrap align="left" variant="h6" fontWeight="bold">
          {props.item
            ? props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : "Price"}
          원
        </Typography>
        <Stack direction="row" spacing={1}>
          <Avatar
            rel="no-referrer"
            referrerPolicy="no-referrer"
            src={
              props.item.from === "BJ"
                ? "/images/bj_icon.svg"
                : props.item.from === "JN"
                ? "/images/jn_icon.ico"
                : props.item.from === "HM"
                ? "/images/hm_icon.png"
                : props.item.from === "NC"
                ? props.item.cafe_icon
                : undefined
            }
            sx={{ width: 17, height: 17 }}
          />
          <Typography noWrap align="left" variant="body2">
            {props.item.from === "BJ"
              ? "번개장터"
              : props.item.from === "JN"
              ? "중고나라"
              : props.item.from === "HM"
              ? "헬로마켓"
              : props.item.from === "NC"
              ? props.item.cafe_name
              : ""}
          </Typography>
        </Stack>
        <Typography noWrap variant="body2" align="right">
          {props.item ? getTimeDiff(props.item.date) : "date"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
