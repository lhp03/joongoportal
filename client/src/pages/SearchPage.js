import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import RecommendKeyowordList from "../components/RecommendKeyowordList";
import SearchList from "../components/SearchList";
import { Container } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchPage = () => {
  const [recommendKeywords, setRecommendKeywords] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  return (
    <div align="center">
      <Container>
        <Typography align="left" variant="h5" fontWeight="bold">
          상품 검색
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Container>
      <Searchbar value={keyword} link="search" />
      {keyword !== null && keyword !== undefined ? (
        <>
          {recommendKeywords && recommendKeywords.length > 0 && (
            <RecommendKeyowordList recommendKeywordList={recommendKeywords} />
          )}
          <SearchList
            keyword={keyword}
            setRecommendKeywords={setRecommendKeywords}
          />
        </>
      ) : (
        <Container sx={{ my: 5 }}>
          <SearchIcon sx={{ fontSize: 200, color: "lightgray" }} />
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            중고 상품을
          </Typography>
          <Typography
            align="center"
            variant="h3"
            sx={{ color: "lightgray", fontWeight: "bold" }}
          >
            통합 검색해보세요.
          </Typography>
        </Container>
      )}
    </div>
  );
};

export default SearchPage;
