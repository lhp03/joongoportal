import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import HelloMarketProductList from "../components/HelloMarketProductList";
import BunjangProductList from "../components/BunjangProductList";
import NaverCafeList from "../components/NaverCafeList";
import RecommendKeyowordList from "../components/RecommendKeyowordList";
import { Container, Typography } from "@mui/material";

const SearchPage = () => {
  const { keyword } = useParams();
  const [recommendKeywords, setRecommendKeywords] = useState([]);

  return (
    <div align="center">
      <Searchbar value={keyword} />
      {recommendKeywords && recommendKeywords.length > 0 && (
        <RecommendKeyowordList recommendKeywordList={recommendKeywords} />
      )}
      <Container sx={{ mt: 1, p: 0 }}>
        <Typography align="left" variant="h5" fontWeight="bold">
          검색 결과
        </Typography>
      </Container>
      <NaverCafeList
        keyword={keyword}
        setRecommendKeywords={setRecommendKeywords}
      ></NaverCafeList>
      <BunjangProductList keyword={keyword}></BunjangProductList>
      <HelloMarketProductList keyword={keyword}></HelloMarketProductList>
    </div>
  );
};

export default SearchPage;
