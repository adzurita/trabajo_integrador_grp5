import { useState, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080"; // Reemplazar con la URL real del backend
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400?text=Imagen+no+disponible"; // Imagen por defecto

export const Recommendations = () => {
  const [products, setProducts] = useState([]); // Lista de productos con imágenes
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsWithImages = async () => {
      try {
        const productResponse = await fetch(`${API_BASE_URL}/products`);
        const productData = await productResponse.json();

        // Obtener imágenes para cada producto
        const productsWithImages = await Promise.all(
          productData.map(async (product) => {
            try {
              const imageResponse = await fetch(`${API_BASE_URL}/images/${product.id}`);
              const imageData = await imageResponse.json();
              const images = JSON.stringify(imageData)
              // Verificar que imageData sea un array válido con al menos una imagen
              const validImageUrl = Array.isArray(images) && images.length > 0 ? images[0].url : PLACEHOLDER_IMAGE;
            console.log(validImageUrl)
              return {
                ...product,
                imageUrl: validImageUrl,
              };
            } catch (imageError) {
              console.error(`Error obteniendo imágenes para el producto ${product.id}:`, imageError);
              return { ...product, imageUrl: PLACEHOLDER_IMAGE };
            }
          })
        );

        // Mezclar productos y tomar 10 recomendados
        const shuffledProducts = productsWithImages.sort(() => 0.5 - Math.random()).slice(0, 10);
        setProducts(shuffledProducts);
      } catch (error) {
        console.error("Error al obtener productos e imágenes:", error);
      }
    };

    fetchProductsWithImages();
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const updateVisibleCards = () => {
    if (window.innerWidth < 600) setVisibleCards(1);
    else if (window.innerWidth < 900) setVisibleCards(2);
    else setVisibleCards(3);
  };

  const nextSlide = () => {
    if (index < products.length - visibleCards) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <Box sx={{ mt: 4, width: "100%", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Las experiencias más recomendadas</Typography>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <IconButton onClick={prevSlide} disabled={index === 0}><ArrowBackIos /></IconButton>
        <Box sx={{ display: "flex", overflow: "hidden", gap: 2, width: "100%", justifyContent: "center" }}>
          {products.slice(index, index + visibleCards).map((product) => (
            <Card key={product.id} sx={{ maxWidth: "100%", borderRadius: "16px", boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ height: 220 }}
                image={product.imageUrl}
                alt={product.name}
                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
              />
              <CardContent>
                <Typography variant="h6" align="center">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" align="center">{product.description}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">⏳ {product.available_date || "Fecha no disponible"}</Typography>
                  <Typography variant="body2">⭐ {product.rating || "N/A"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">📍 {product.location}</Typography>
                  <Typography variant="h6" fontWeight="bold">{product.price}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2, backgroundColor: "#00CED1" }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Reservar
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        <IconButton onClick={nextSlide} disabled={index >= products.length - visibleCards}><ArrowForwardIos /></IconButton>
      </Box>
    </Box>
  );
};
