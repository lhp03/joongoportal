import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NaverCafeCard from "./NaverCafeCard";
import axios from "axios";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";

const NaverCafeList = (props) => {
  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `/api/searchnaver?keyword=${keyword}&page=${page}`
    );
    setProgress(false);
    return response.data.naver;
  };

  const [progress, setProgress] = useState(false);
  const [listNum, setListNum] = useState(10);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [btnAble, setBtnAble] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await search(props.keyword, page);
      const list = data.products;

      props.setRecommendKeywords(data.recommendKeywordList);
      setPage(page + 1);
      setProducts([...products, ...list]);
    };
    loadData();
  }, []);

  return (
    <Container
      align="center"
      maxWidth="lg"
      sx={{
        marginY: 2,
        border: 1,
        borderRadius: "20px",
        borderColor: "lightgray",
        position: "relative",
      }}
    >
      <Box
        component="img"
        sx={{ mt: 2, height: 50, objectFit: "cover" }}
        src={process.env.PUBLIC_URL + "/cafe_icon.png"}
      />
      <Backdrop
        sx={{
          color: "#fff",
          position: "absolute",
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
        open={progress}
      >
        <CircularProgress sx={{ color: "#e0e0e0" }} />
      </Backdrop>
      <Grid container sx={{ display: "flex" }}>
        {products.length > 0 ? (
          products.map(
            (element, index) =>
              index < listNum && (
                <Grid key={`naver_product${index}`} item xs={12} lg={6}>
                  <NaverCafeCard product={element} />
                </Grid>
              )
          )
        ) : (
          <Box sx={{ my: 3, width: "100%" }}>
            <Typography align="center" color={"gray"}>
              검색결과가 없습니다
            </Typography>
            <Typography align="center" color={"gray"}>
              다른 검색어를 입력해주세요.
            </Typography>
          </Box>
        )}
      </Grid>
      <Button
        size="large"
        color="inherit"
        sx={{ width: "100%" }}
        disabled={!btnAble}
        onClick={async () => {
          if (!progress) {
            setListNum(listNum + 10);
            if (products.length - listNum < 10) {
              const newProducts = (await search(props.keyword, page)).products;

              if (newProducts.length == 0) {
                setBtnAble(false);
              } else {
                setProducts([...products, ...newProducts]);
                setPage(page + 1);
              }
            }
          }
        }}
      >
        <KeyboardDoubleArrowDown fontSize="small" />
      </Button>
    </Container>
  );
};

export default NaverCafeList;
