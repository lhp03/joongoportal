import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import RecommendKeyowordList from "../components/RecommendKeyowordList";
import SearchList from "../components/SearchList";

const SearchPage = () => {
  const { keyword } = useParams();
  const [recommendKeywords, setRecommendKeywords] = useState([]);

  return (
    <div align="center">
      <Searchbar value={keyword} />
      {recommendKeywords && recommendKeywords.length > 0 && (
        <RecommendKeyowordList recommendKeywordList={recommendKeywords} />
      )}
      <SearchList
        keyword={keyword}
        setRecommendKeywords={setRecommendKeywords}
      />
    </div>
  );
};

export default SearchPage;
