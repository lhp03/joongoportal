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
  const [progress, setProgress] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  //order 0 -> recently, 1 -> low price, 2 -> high price

  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `/api/search?keyword=${keyword}&page=${page}&order=${props.order}`
    );
    setPage((prevPage) => prevPage + 1);
    setProgress(false);
    return response.data;
  };

  useEffect(() => {
    const loadData = async () => {
      const newProducts = await search(props.keyword, page);
      setProducts((prevProducts) => [...prevProducts, ...newProducts.products]);
      props.setRecommendKeywords(newProducts.keywords);
    };
    loadData();
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Typography align="left" variant="h5" fontWeight="bold">
        검색 결과
      </Typography>
      <div align="right">
        <Typography
          display="inline"
          fontWeight={props.order === "DATE_DESC" ? "bold" : ""}
          color={props.order === "DATE_DESC" ? "primary" : ""}
          sx={{ mx: 1, cursor: "pointer" }}
          onClick={() => {
            if (props.order !== "DATE_DESC") {
              window.location.replace(
                `/search?keyword=${props.keyword}&order=DATE_DESC`
              );
            }
          }}
        >
          최신순
        </Typography>
        <Typography
          display="inline"
          fontWeight={props.order === "COST_ASC" ? "bold" : ""}
          color={props.order === "COST_ASC" ? "primary" : ""}
          sx={{ mx: 1, cursor: "pointer" }}
          onClick={() => {
            if (props.order !== "COST_ASC") {
              window.location.replace(
                `/search?keyword=${props.keyword}&order=COST_ASC`
              );
            }
          }}
        >
          낮은 가격순
        </Typography>
        <Typography
          display="inline"
          fontWeight={"COST_DESC" === 2 ? "bold" : ""}
          color={"COST_DESC" === 2 ? "primary" : ""}
          sx={{ mx: 1, cursor: "pointer" }}
          onClick={() => {
            if (props.order !== "COST_DESC") {
              window.location.replace(
                `/search?keyword=${props.keyword}&order=COST_DESC`
              );
            }
          }}
        >
          높은 가격순
        </Typography>
      </div>
      <Divider sx={{ my: 2 }} />
      <Backdrop
        sx={{
          color: "#fff",
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
