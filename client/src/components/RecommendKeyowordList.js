import { Box, Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

const RecommendKeyowordList = (props) => {
  const [num, setNum] = useState(5);

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Typography align="left" variant="h5" fontWeight="bold">
          연관 검색어
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Container>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
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
                    window.location.replace(`/search?keyword=${element}`);
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
            {num === 5 ? "더보기" : "접기"}
          </Button>
        )}
      </Container>
    </>
  );
};
export default RecommendKeyowordList;
