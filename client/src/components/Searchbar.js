import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";

const Searchbar = (props) => {
  const [keyword, setKeyword] = useState(props.value);
  const navigate = useNavigate();

  return (
    <Container sx={{ m: 2 }}>
      <TextField
        label="검색어"
        variant="outlined"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        size="small"
        sx={{ width: "80%", m: 0.5 }}
        defaultValue={props.value}
      />
      <Button
        variant="contained"
        size="large"
        margin="normal"
        sx={{ width: "15%", m: 0.5 }}
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
