import { useState, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Button } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Experiencia ${i + 1}`,
  description: "Una aventura única e inolvidable.",
  price: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  created_at: new Date().toISOString(),
  category: "Aventura",
  capacity: `${Math.floor(Math.random() * 10) + 1} personas`,
  available_date: "Disponible todo el año",
  image: `https://picsum.photos/300/200?random=${i + 1}`,
}));

export const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const shuffled = dummyProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
    setProducts(shuffled);
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const updateVisibleCards = () => {
    if (window.innerWidth < 600) {
      setVisibleCards(1);
    } else if (window.innerWidth < 900) {
      setVisibleCards(2);
    } else {
      setVisibleCards(3);
    }
  };

  const nextSlide = () => {
    if (index < products.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <Box sx={{ mt: 4, width: "100%", margin: "0 auto" }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontFamily: "Outfit", 
          fontWeight: 700, 
          fontSize: { xs: "24px", sm: "30px", md: "40px" },
          textAlign: "left",
          // pl: '40px', 
          mb: 3 
        }}
      >
        Las experiencias más recomendadas
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <IconButton onClick={prevSlide} disabled={index === 0}>
          <ArrowBackIos />
        </IconButton>
        <Box sx={{ display: "flex", overflow: "hidden", gap: 2, width: "100%", justifyContent: "center" }}>
          {products.slice(index, index + visibleCards).map((product) => (
            <Card key={product.id} sx={{ flex: "1 0 auto", maxWidth: "100%", minWidth: { xs: "100%", sm: "48%", md: "30%" }, borderRadius: "16px", boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ height: 220, width: "100%", objectFit: "cover" }}
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" align="center">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary" align="center">{product.description}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">⏳ {product.available_date}</Typography>
                  <Typography variant="body2">⭐ 4.5</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2">📍 Ubicación</Typography>
                  <Typography variant="h6" fontWeight="bold">{product.price}</Typography>
                </Box>
                <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor:"#00CED1" }}>Reservar</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
        <IconButton onClick={nextSlide} disabled={index >= products.length - visibleCards}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

