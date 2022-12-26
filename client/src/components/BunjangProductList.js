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
import BunjangProductCard from "./BunjangProductCard";
import axios from "axios";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";

const TestBunjangProductList = (props) => {
  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `http://localhost:5000/api/searchbunjang?keyword=${keyword}&page=${page}`
    );
    setProgress(false);
    return response.data.bunjang;
  };

  const [progress, setProgress] = useState(false);
  const [listNum, setListNum] = useState(9);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [btnAble, setBtnAble] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setProducts([]);
      const list = await search(props.keyword, page);
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
        src={process.env.PUBLIC_URL + "/logo_bunjang.png"}
      />
      <Backdrop
        sx={{
          color: "#eeeeee",
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
                <Grid key={`bunjang_product${index}`} item xs={6} lg={4}>
                  <BunjangProductCard product={element} />
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
            setListNum(listNum + 9);
            if (products.length - listNum < 9) {
              const newProducts = await search(props.keyword, page);
              if (newProducts.length === 0) {
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

export default TestBunjangProductList;
