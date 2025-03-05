import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";
import { Avatar } from "@mui/material";

const pages = [
  { name: "Home", id: "home" },
  { name: "Recomendaciones", id: "recomendaciones" },
  { name: "Explora", id: "explora" },
];

export const Header = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const scrollToSection = (id) => {
  //   const section = document.getElementById(id);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <AppBar position="fixed" elevation="0" sx={{ backgroundColor: "#F3F4F6" }}>
      <Container maxWidth="xl" sx={{ width: '90%', padding: '0 !important' }}>
        <Toolbar disableGutters>
          <a href="/">

          <img
            src="src/assets/logo.svg"
            alt="logo xplora+"
            style={{ width: "150px", height: "auto" }}
          />
          </a>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map(({name, id}) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "&:hover .line": {
                    opacity: 1,
                  },
                }}
              >
                <Link to={id} smooth={true} duration={500}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "#A39A9A",
                      display: "block",
                      textAlign: "center",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {name}
                  </Button>
                </Link>

                <Box
                  className="line"
                  sx={{
                    width: "53px",
                    height: "2px",
                    backgroundColor: "#FF69B4",
                    marginTop: "-20px",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "#00CED1", color: "white" }}>{user.avatar}</Avatar>
                <Button onClick={logout} sx={{ color: "#A39A9A" }}>
                  Cerrar sesión
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button onClick={() => setOpenModal(true)} sx={{ color: "#A39A9A" }}>
                Iniciar sesión
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#00CED1", borderRadius: "10px", boxShadow: "none" }}>
                Registrarse
              </Button>
            </Box>
          )}
            <Login open={openModal} handleClose={() => setOpenModal(false)} handleLogin={login} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
