import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-scroll";
import { Registration } from "../../components";

const pages = [
  { name: "Home", id: "home" },
  { name: "Recomendaciones", id: "recomendaciones" },
  { name: "Explora", id: "explora" },
];

export const Header = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <AppBar
        position="fixed"
        elevation="0"
        sx={{
          backgroundColor: "#F3F4F6",
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        <Container maxWidth="xl" sx={{ width: "90%", padding: "0 !important" }}>
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
              {pages.map(({ name, id }) => (
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
              <Button
                sx={{
                  color: "#A39A9A",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                Iniciar sesión
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00CED1",
                  borderRadius: "10px",
                  boxShadow: "none",
                }}
                onClick={handleOpen}
              >
                Registrarse
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>{" "}
      <Registration open={open} setOpen={setOpen} handleOpen={handleOpen}/>
    </>
  );
};
