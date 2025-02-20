import { Box, Typography } from "@mui/material";
import { ImageSlider } from "../../components/imageSlider/ImageSlider";
import { Recommendations } from "../../components/recommendations/recommendations";
import { Explore } from "../../components/explore/Explore";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mb: 5,
      }}
    >
      <ImageSlider />

      <Box id="recomendaciones">
        <Recommendations />
      </Box>
      <Box id="explora">
        <Explore />
      </Box>
    </Box>
  );
};
