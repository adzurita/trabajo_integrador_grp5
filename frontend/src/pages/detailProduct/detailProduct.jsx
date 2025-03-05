import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Select, MenuItem, Button, IconButton, FormControl, InputLabel, Dialog } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WindowIcon from '@mui/icons-material/Window';
import CloseIcon from '@mui/icons-material/Close';


const dummyProduct = {
    id: 1,
    name: "Aventura en la Montaña",
    description: "Disfruta de una experiencia única explorando montañas y disfrutando de la naturaleza.",
    duration: "4 horas",
    capacity: "10 personas",
    included: ["Guía turístico", "Equipo de seguridad", "Transporte ida y vuelta"],
    pricePerPerson: 50,
    images: [
        "https://picsum.photos/600/400?random=1",
        "https://picsum.photos/200/400?random=2",
        "https://picsum.photos/200/400?random=3",
        "https://picsum.photos/200/400?random=4",
        "https://picsum.photos/200/400?random=5"
    ]
};

export const ProductDetail = () => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedPeople, setSelectedPeople] = useState();
    const [openGallery, setOpenGallery] = useState(false);
    // const { id } = useParams();
    const navigate = useNavigate();
    const product = dummyProduct;

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handlePeopleChange = (event) => {
        setSelectedPeople(event.target.value);
    }
    
    return (
        <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{ mt: 6 }}>
                    <img src={product.images[0]} alt="Principal" style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "8px" }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={1} sx={{ mt: 5 }}>
                        {product.images.slice(1).map((img, index) => (
                            <Grid item xs={6} key={index} sx={{ position: "relative" }}>
                                <img src={img} alt={`random ${index + 1}`} style={{ width: "100%", height: 194, objectFit: "cover", borderRadius: "8px" }} />
                                {index === 3 && (
                                    <Button
                                        variant="contained"
                                        startIcon={<WindowIcon/>}
                                        onClick={() => navigate("/gallery")}
                                        sx={{
                                            position: "absolute",
                                            bottom: 10,
                                            right: 10,
                                            fontSize: "0.8rem",
                                            padding: "5px 10px",
                                            backgroundColor: "#00CED1"
                                        }}
                                    >
                                        Ver Más
                                    </Button>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>{product.name}</Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" fontWeight="bold">Descripción</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Detalles</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <CalendarMonthIcon />
                        <Typography variant="body1">Duración:</Typography>
                        <Typography color="textSecondary">{product.duration}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <PeopleIcon />
                        <Typography variant="body1">Cupo:</Typography>
                        <Typography color="textSecondary">{product.capacity}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <InfoIcon />
                        <Typography variant="body1">Incluido:</Typography>
                        <Typography color="textSecondary">{product.included.join(", ")}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 3, backgroundColor: "white", borderRadius: "8px", boxShadow: 3, mb: 5 }}>
                        <Typography variant="h6" fontWeight="bold">Reserva tu experiencia</Typography>
                        <Box sx={{ backgroundColor: "white", p: 3, borderRadius: 2 }}>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="fecha-label">Fecha</InputLabel>
                                <Select labelId="fecha-label" value={selectedDate} onChange={handleDateChange}>
                                    <MenuItem value="2024-02-20">20 de Febrero</MenuItem>
                                    <MenuItem value="2024-02-21">21 de Febrero</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="personas-label">Número de Personas</InputLabel>
                                <Select labelId="personas-label" value={selectedPeople} onChange={handlePeopleChange}>
                                    <MenuItem value={1}>1 Persona</MenuItem>
                                    <MenuItem value={2}>2 Personas</MenuItem>
                                    <MenuItem value={3}>3 Personas</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                            <Typography>Precio por persona</Typography>
                            <Typography fontWeight="bold">${product.pricePerPerson}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                            <IconButton><RemoveIcon /></IconButton>
                            <Typography variant="h6" sx={{ mx: 2 }}>1</Typography>
                            <IconButton><AddIcon /></IconButton>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd", mt: 2, pt: 2 }}>
                            <Typography fontWeight="bold">Total</Typography>
                            <Typography fontWeight="bold">$50</Typography>
                        </Box>
                        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Reservar</Button>
                    </Box>
                </Grid>
            </Grid>             
            <Dialog open={openGallery} onClose={() => setOpenGallery(false)} fullWidth maxWidth="md">                 <Box sx={{ p: 3 }}>                     <IconButton onClick={() => setOpenGallery(false)} sx={{ position: "absolute", top: 10, right: 10 }}>                         <CloseIcon />
                </IconButton>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Galería de imágenes</Typography>                    <Grid container spacing={2}>
                        {product.images.map((img, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <img src={img} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Dialog>
        </Box>
    );
};

// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Box, Typography, Grid, Select, MenuItem, Button, IconButton, FormControl, InputLabel, Dialog } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import PeopleIcon from "@mui/icons-material/People";
// import InfoIcon from "@mui/icons-material/Info";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import CloseIcon from "@mui/icons-material/Close";
// import WindowIcon from '@mui/icons-material/Window';

// const dummyProduct = {
//     id: 1,
//     name: "Aventura en la Montaña",
//     description: "Disfruta de una experiencia única explorando montañas y disfrutando de la naturaleza.",
//     duration: "4 horas",
//     capacity: "10 personas",
//     included: ["Guía turístico", "Equipo de seguridad", "Transporte ida y vuelta"],
//     pricePerPerson: 50,
//     images: [
//         "https://picsum.photos/600/400?random=1",
//         "https://picsum.photos/200/400?random=2",
//         "https://picsum.photos/200/400?random=3",
//         "https://picsum.photos/200/400?random=4",
//         "https://picsum.photos/200/400?random=5",
//         "https://picsum.photos/600/400?random=6"
//     ]
// };

// export const ProductDetail = () => {
//     const [selectedDate, setSelectedDate] = useState();
//     const [selectedPeople, setSelectedPeople] = useState();
//     const [openGallery, setOpenGallery] = useState(false);
//     const { id } = useParams();
//     const product = dummyProduct;

//     const handleDateChange = (event) => {
//         setSelectedDate(event.target.value);
//     };

//     const handlePeopleChange = (event) => {
//         setSelectedPeople(event.target.value);
//     };

//     return (
//         <Box sx={{ width: "90%", margin: "0 auto", mt: 4 }}>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} md={8} sx={{ mt: 6 }}>
//                     <img src={product.images[0]} alt="Principal" style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: "8px" }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Grid container spacing={1} sx={{ mt: 5, position: "relative" }}>
//                         {product.images.slice(1, 5).map((img, index) => (
//                             <Grid item xs={6} key={index} sx={{ position: "relative" }}>
//                                 <img src={img} alt={`random ${index + 1}`} style={{ width: "100%", height: 194, objectFit: "cover", borderRadius: "8px" }} />
//                                 {index === 3 && (
//                                     <Button
//                                         variant="contained"
                                        
//                                         startIcon={<WindowIcon/>}
//                                         onClick={() => setOpenGallery(true)}
//                                         sx={{
//                                             position: "absolute",
//                                             bottom: 10,
//                                             right: 10,
//                                             fontSize: "0.8rem",
//                                             padding: "5px 10px",
//                                             backgroundColor: 
//                                         }}
//                                     >
//                                         Ver Más
//                                     </Button>
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>{product.name}</Typography>
//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid item xs={12} md={8}>
//                     <Typography variant="h6" fontWeight="bold">Descripción</Typography>
//                     <Typography>{product.description}</Typography>
//                     <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Detalles</Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <CalendarMonthIcon />
//                         <Typography variant="body1">Duración:</Typography>
//                         <Typography color="textSecondary">{product.duration}</Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <PeopleIcon />
//                         <Typography variant="body1">Cupo:</Typography>
//                         <Typography color="textSecondary">{product.capacity}</Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
//                         <InfoIcon />
//                         <Typography variant="body1">Incluido:</Typography>
//                         <Typography color="textSecondary">{product.included.join(", ")}</Typography>
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* Diálogo de la galería de imágenes */}
//             <Dialog open={openGallery} onClose={() => setOpenGallery(false)} fullWidth maxWidth="md">
//                 <Box sx={{ p: 3 }}>
//                     <IconButton onClick={() => setOpenGallery(false)} sx={{ position: "absolute", top: 10, right: 10 }}>
//                         <CloseIcon />
//                     </IconButton>
//                     <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Galería de imágenes</Typography>
//                     <Grid container spacing={2}>
//                         {product.images.map((img, index) => (
//                             <Grid item xs={12} sm={6} md={4} key={index}>
//                                 <img src={img} alt={`Imagen ${index + 1}`} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </Box>
//             </Dialog>
//         </Box>
//     );
// };
