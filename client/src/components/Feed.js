import {
  Backdrop,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Feed = (props) => {
  const [products, setProducts] = useState([]);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setProgress(true);
      const response = await axios.get("/api/feed");
      const list = response.data.feed;
      setProducts((prevProducts) => [...prevProducts, ...list]);
      setProgress(false);
    };
    loadData();
  }, []);

  return (
    <Container sx={{ my: 2 }}>
      <Typography align="left" variant="h5" fontWeight="bold">
        인기 상품
      </Typography>

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
          <Grid
            align="center"
            key={`feed_${index}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <ProductCard item={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;
