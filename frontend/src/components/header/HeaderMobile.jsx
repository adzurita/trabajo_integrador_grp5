import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-scroll";
import { useState } from "react";
import LoginIcon from '@mui/icons-material/Login';


const pages = [
    { name: "Home", id: "home" },
    { name: "Recomendaciones", id: "recomendaciones" },
    { name: "Explora", id: "explora" },
];

export const HeaderMobile = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="fixed" elevation="0" sx={{ backgroundColor: "#F3F4F6" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Menu Hamburguesa (Izquierda) */}
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map(({ name, id }) => (
                                <MenuItem key={id} onClick={handleCloseNavMenu}>
                                    <Link to={id} smooth={true} duration={500} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography textAlign="center">{name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo (Centro) */}
                    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                        <a href="/">
                            <img
                                src="src/assets/logo.svg"
                                alt="logo xplora+"
                                style={{ width: "150px", height: "auto" }}
                            />
                        </a>
                    </Box>

                    {/* Botón Iniciar Sesión (Derecha) */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                            sx={{
                                color: "#A39A9A",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                            startIcon={<LoginIcon />} // Icono de inicio de sesión
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};