import { Box, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const dummyImages = [
    "https://picsum.photos/800/500?random=1",
    "https://picsum.photos/400/500?random=2",
    "https://picsum.photos/400/500?random=3", 
    "https://picsum.photos/800/500?random=4",
    "https://picsum.photos/400/500?random=5",
    "https://picsum.photos/400/500?random=6"
];

export const Gallery = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: "90%", height: "90vh", overflowY: "auto", margin: 'auto' }}>
            <Box sx={{ width: "100%", py: 2, px: 3, bgcolor: "white", position: "fixed", top: 0, left: 0, zIndex: 10, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                <Typography variant="h6" fontWeight="bold">Galería de imágenes</Typography>
                <Typography variant="body2" onClick={() => navigate(-1)} sx={{ cursor: "pointer", color: "blue" }}>← Volver</Typography>
            </Box>
            <Box sx={{ pt: 10, px: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img src={dummyImages[0]} alt="Imagen principal" style={{ width: "100%", height: 500, objectFit: "cover", borderRadius: "8px" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <img src={dummyImages[1]} alt="Imagen secundaria" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: "8px" }} />
                    </Grid>
                    <Grid item xs={6}>
                        <img src={dummyImages[2]} alt="Imagen secundaria" style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: "8px" }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};
