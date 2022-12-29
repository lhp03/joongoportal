import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const SearchList = (props) => {
  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `http://localhost:5000/api/search?keyword=${keyword}&page=${page}`
    );
    setPage((prev) => prev + 1);
    setProgress(false);
    return response.data;
  };

  const [progress, setProgress] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      const newProducts = await search(props.keyword, page);
      console.log(newProducts);
      setProducts((prevProducts) => [...prevProducts, ...newProducts.products]);
      props.setRecommendKeywords(newProducts.keywords);
    };
    loadData();
  }, []);

  return (
    <Container sx={{ my: 2, position: "relative" }}>
      <Typography align="left" variant="h5" fontWeight="bold">
        검색 결과
      </Typography>
      <Divider sx={{ my: 2 }} />
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
      <Grid container>
        {products.map((product, index) => (
          <Grid key={`search_${index}`} item xs={6} sm={4} lg={3}>
            <ProductCard item={product} sx={{ display: "flex" }} />
          </Grid>
        ))}
      </Grid>
      <Button
        sx={{ color: "black" }}
        onClick={async () => {
          if (!progress) {
            const response = await search(props.keyword, page);
            setProducts((prevProducts) => [
              ...prevProducts,
              ...response.products,
            ]);
          }
        }}
      >
        더보기
      </Button>
    </Container>
  );
};

export default SearchList;
