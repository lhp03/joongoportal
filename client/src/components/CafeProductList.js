import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableFooter,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import axios from "axios";

const CafeProductList = (props) => {
  const search = async (keyword, page) => {
    setProgress(true);
    const response = await axios.get(
      `/api/searchjoonggonara?keyword=${keyword}&page=${page}`
    );
    setProgress(false);
    return response.data.joongonara;
  };

  const [progress, setProgress] = useState(false);
  const [listNum, setListNum] = useState(10);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const list = await search(props.keyword, 1);
      setProducts(list);
    };

    loadData();
  }, []);

  return (
    <Container align="center" maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
      <TableContainer component={Paper} sx={{ width: "auto" }}>
        <Table
          sx={{ minWidth: 650, textOverflow: "ellipsis" }}
          aria-label="caption table"
        >
          <caption style={{ textAlign: "right" }}>
            중고나라의 상품 목록입니다.
          </caption>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <Box
                  component="img"
                  sx={{ height: 50, objectFit: "cover" }}
                  src={process.env.PUBLIC_URL + "/logo_joonggonara.png"}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성일</TableCell>
              <TableCell align="center">조회수</TableCell>
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
            {products.map(
              (product, index) =>
                index < listNum && (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => window.open(product.link)}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body2">{product.title}</Typography>
                    </TableCell>
                    <TableCell align="center">{product.date}</TableCell>
                    <TableCell align="center">{product.view}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
          <TableFooter>
            <TableRow hover>
              <TableCell
                colSpan={3}
                align="center"
                onClick={async () => {
                  if (!progress) {
                    setListNum(listNum + 10);
                    if (listNum % 50 === 0) {
                      const newProducts = await search(
                        props.keyword,
                        Math.floor(listNum / 50 + 1)
                      );
                      setProducts([...products, ...newProducts]);
                    }
                  }
                }}
              >
                {<KeyboardDoubleArrowDownIcon />}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CafeProductList;
