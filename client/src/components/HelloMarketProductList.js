import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUp";
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
  }, []);

  return (
    <Container align="center" maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption style={{ textAlign: "right" }}>
            헬로마켓의 상품 목록입니다.
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box
                  component="img"
                  sx={{ height: 50, objectFit: "cover" }}
                  src={process.env.PUBLIC_URL + "/logo_hellomarket.png"}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ position: "relative" }}>
            <Backdrop
              sx={{
                color: "#fafafa",
                position: "absolute",
                zIndex: (theme) => theme.zIndex.drawer - 1,
              }}
              open={progress}
            >
              <CircularProgress sx={{ color: "#e0e0e0" }} />
            </Backdrop>
            <TableRow>
              <TableCell sx={{ m: 0, p: 0 }}>
                <Grid container>
                  {products.map(
                    (element, index) =>
                      index < listNum && (
                        <Grid item xs={4}>
                          <HelloMarketProductCard product={element} />
                        </Grid>
                      )
                  )}
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow hover>
              <TableCell
                align="center"
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
                {listNum < 30 ? (
                  <KeyboardDoubleArrowDown fontSize="small" />
                ) : (
                  <KeyboardDoubleArrowUp fontSize="small" />
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default HelloMarketProductList;
