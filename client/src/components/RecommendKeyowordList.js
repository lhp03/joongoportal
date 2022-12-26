import KeyboardDoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubbleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

const RecommendKeyowordList = (props) => {
  const [num, setNum] = useState(5);

  return (
    <>
      <Container sx={{ mt: 1, p: 0 }}>
        <Typography align="left" variant="h5" fontWeight="bold">
          연관 검색어
        </Typography>
      </Container>
      <Container
        sx={{
          marginY: 2,
          border: 1,
          borderRadius: "20px",
          borderColor: "lightgray",
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          py: 1,
        }}
      >
        {props.recommendKeywordList.map(
          (element, index) =>
            index < num && (
              <Box
                key={`keword${index}`}
                sx={{ textOverflow: "ellipsis", mx: 1, my: 0.5 }}
              >
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    p: 0.5,
                    backgroundColor: "primary.main",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                  onClick={() => {
                    window.location.replace(`/search/${element}`);
                  }}
                >
                  {element}
                </Typography>
              </Box>
            )
        )}
        {props.recommendKeywordList.length > 5 && (
          <Button
            fullWidth
            color="inherit"
            sx={{ mt: 2 }}
            onClick={() => {
              if (num === 5) {
                setNum(20);
              } else {
                setNum(5);
              }
            }}
          >
            {num === 5 ? (
              <KeyboardDoubleArrowDown fontSize="small" />
            ) : (
              <KeyboardDoubbleArrowUp fontSize="small" />
            )}
          </Button>
        )}
      </Container>
    </>
  );
};
export default RecommendKeyowordList;
