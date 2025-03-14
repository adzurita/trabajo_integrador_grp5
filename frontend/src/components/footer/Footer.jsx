import { Box, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter, Phone, Email } from "@mui/icons-material";

export const Footer = () => {
    return (
        <Box sx={{ bgcolor: "#00CED1", color: "white", py: 4, px: 2, textAlign: "center" }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <img
                        src="src/assets/logowhite.svg"
                        alt="logo xplora+"
                        style={{ width: "200px", height: "auto", color: "white" }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Síguenos
                    </Typography>
                    <Box>
                        <IconButton sx={{ color: "white" }} href="https://facebook.com" target="_blank">
                            <Facebook />
                        </IconButton>
                        <IconButton sx={{ color: "white" }} href="https://instagram.com" target="_blank">
                            <Instagram />
                        </IconButton>
                        <IconButton sx={{ color: "white" }} href="https://linkedin.com" target="_blank">
                            <LinkedIn />
                        </IconButton>
                        <IconButton sx={{ color: "white" }} href="https://twitter.com" target="_blank">
                            <Twitter />
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Contacto
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                        <Phone sx={{ mr: 1 }} />
                        <Typography variant="body2">+123 456 7890</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
                        <Email sx={{ mr: 1 }} />
                        <Typography variant="body2">contacto@empresa.com</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Typography variant="body2" sx={{ mt: 3 }}>
                © {new Date().getFullYear()} Empresa. Todos los derechos reservados.
            </Typography>
        </Box>
    );
};
