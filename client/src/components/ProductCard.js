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
        maxWidth: 250,
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
        component="img"
        height="280"
        width="280"
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
          {props.item.state === 0 || props.item.state === undefined ? (
            <Chip label="판매중" color="success" size="small" />
          ) : (
            <Chip label="판매완료" color="error" size="small" />
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
            src={
              props.item.from === "BJ"
                ? "/images/bj_icon.svg"
                : props.item.from === "JN"
                ? "/images/jn_icon.ico"
                : props.item.from === "HM"
                ? "/images/hm_icon.png"
                : ""
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
