import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Pagination, Rating, InputAdornment, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const categories = ["Todos", "Aventura", "Gastronomía", "Bienestar", "Cultura"];

const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Experiencia ${i + 1}`,
  description: "Una aventura única e inolvidable.",
  price: `$${(Math.random() * 100 + 50).toFixed(2)}`,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  image: `https://picsum.photos/300/200?random=${i + 1}`,
  date: "12 de Marzo, 2025",
  rating: (Math.random() * 2 + 3).toFixed(1),
  location: "Bogotá, Colombia"
}));

export const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = dummyProducts.filter(
      (product) =>
        (selectedCategory === "Todos" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setPage(1);
  }, [searchTerm, selectedCategory]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  }

  return (
    <Box sx={{ width: "100%", margin: "0 auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Typography sx={{ fontFamily: "Outfit", fontWeight: 700, fontSize: "40px", lineHeight: "50.4px" }}>
          Explora más
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <TextField
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#00CED1" }} />
                </InputAdornment>
              )
            }}
          />
          <Button variant="contained" sx={{ bgcolor: "#00CED1", color: "white" }}>
            Buscar
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto", mb: 3, flexWrap: "wrap" }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(category)}
            sx={{ borderColor: "#00CED1", backgroundColor: selectedCategory === category ? "#00CED1" : "#ffffff",  color: selectedCategory === category ? "#ffffff" : "#00CED1" }}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, padding: {xs:''}, gap: 3 }}>
        {filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((product) => (
          <Box
            key={product.id}
            onClick={() => handleCardClick(product.id)}
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" }
            }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: "100%", height: 220, objectFit: "cover" }} 
            />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonthIcon sx={{ fontSize: 16, color: "gray" }} />
                  <Typography variant="body2" color="textSecondary">{product.date}</Typography>
                </Box>
                <Rating value={parseFloat(product.rating)} precision={0.1} readOnly size="small" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: "gray" }} />
                <Typography variant="body2" color="textSecondary">{product.location}</Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{product.price}</Typography>
            </Box>
          </Box>
        ))}
      
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={Math.ceil(filteredProducts.length / itemsPerPage)} page={page} onChange={(_, value) => setPage(value)} />
      </Box>
    </Box>
  );
};
