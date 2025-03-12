import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const API_BASE_URL = "http://localhost:8080"; // Reemplazar con la URL real del backend
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/1200x500?text=Imagen+no+disponible"; // Imagen por defecto

export const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImagesForSlider = async () => {
      try {
        const productResponse = await fetch(`${API_BASE_URL}/products`);
        const productData = await productResponse.json();

        let imagesArray = [];

        for (const product of productData) {
          if (imagesArray.length >= 5) break; // Detenerse cuando ya hay 5 imágenes

          try {
            const imageResponse = await fetch(`${API_BASE_URL}/images/${product.id}`);
            const imageData = await imageResponse.json();

            if (imageData.length > 0) {
              imagesArray = [...imagesArray, ...imageData.map(img => img.url)];
            }
          } catch {
            imagesArray.push(PLACEHOLDER_IMAGE);
          }
        }

        // Asegurar que haya al menos 5 imágenes en total
        while (imagesArray.length < 5) {
          imagesArray.push(PLACEHOLDER_IMAGE);
        }

        setImages(imagesArray.slice(0, 5)); // Tomar solo las primeras 5 imágenes
      } catch (error) {
        console.error("Error al obtener imágenes para el slider:", error);
        setImages(Array(5).fill(PLACEHOLDER_IMAGE)); // Mostrar 5 imágenes de respaldo en caso de error
      }
    };

    fetchImagesForSlider();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: dots => (
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", display: "flex" }}> {dots} </ul>
      </Box>
    ),
    customPaging: i => (
      <Box
        sx={{
          width: 12,
          height: 12,
          backgroundColor: "white",
          borderRadius: "50%",
          opacity: 0.7,
          transition: "opacity 0.3s",
          "&:hover": { opacity: 1 }
        }}
      />
    )
  };

  return (
    <Box sx={{ 
      position: "relative", 
      width: "90%", 
      margin: "auto", 
      overflow: "hidden",
      mt: 4,
      mb: 4
    }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{ 
                width: "100%", 
                height: "400px",
                borderRadius: 10, 
                objectFit: "cover" 
              }}
              onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: "8px",
                width: "80%"
              }}
            >
              Más aventura, más sabor, más momentos inolvidables
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
