import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Searchbar = (props) => {
  const [keyword, setKeyword] = useState(props.value);

  return (
    <Container maxWidth="lg" sx={{ mt: 7 }}>
      <TextField
        label="검색어"
        variant="outlined"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        size="small"
        sx={{ width: "72%" }}
        defaultValue={props.value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.location.replace(`/search/${keyword}`);
          }
        }}
      />
      <Button
        variant="contained"
        size="large"
        sx={{ width: "25%", ml: "3%" }}
        onClick={() => {
          window.location.replace(`/search/${keyword}`);
        }}
      >
        검색
      </Button>
    </Container>
  );
};

export default Searchbar;
