import { Box, Typography } from "@mui/material";
import { ImageSlider } from "../../components/imageSlider/ImageSlider";
import { Recommendations } from "../../components/recommendations/recommendations";
import { Explore } from "../../components/explore/Explore";

export const Home = () => {
  return (
    <Box
      id="home"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
      <ImageSlider />
      <Box id="recomendaciones" sx={{ width: "90%" }}>
        <Recommendations />
      </Box>
      <Box id="explora" sx={{ width: "90%" }}>
        <Explore />
      </Box>
    </Box>
  );
};
