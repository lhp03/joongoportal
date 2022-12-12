import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import HelloMarketProductCard from "./HelloMarketProductCard";
import axios from "axios";

const HelloMarketProductList = (props) => {
  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `/api/searchhellomarket?keyword=${keyword}&page=${page}`
    );
    setProgress(false);
    return response.data.hellomarket;
  };

  const [progress, setProgress] = useState(false);
  const [listNum, setListNum] = useState(9);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const list = await search(props.keyword, page);
      setPage(page + 1);
      setProducts([...products, ...list]);
    };
    loadData();
    console.log(products);
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
        src={process.env.PUBLIC_URL + "/logo_hellomarket.png"}
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
        {products.map(
          (element, index) =>
            index < listNum && (
              <Grid key={`hello_product${index}`} item xs={6} lg={4}>
                <HelloMarketProductCard product={element} />
              </Grid>
            )
        )}
      </Grid>
      <Button
        size="large"
        color="inherit"
        sx={{ width: "100%" }}
        onClick={async () => {
          if (!progress) {
            setListNum(listNum + 9);
            if (products.length - listNum < 9) {
              const newProducts = await search(props.keyword, page);
              setProducts([...products, ...newProducts]);
              setPage(page + 1);
            }
          }
        }}
      >
        <KeyboardDoubleArrowDown fontSize="small" />
      </Button>
    </Container>
  );
};

export default HelloMarketProductList;
