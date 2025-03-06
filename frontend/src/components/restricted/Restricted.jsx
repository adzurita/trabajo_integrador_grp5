import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Restricted = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00CED1",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Acceso Restringido
      </Typography>
      <Typography variant="body1" mt={2}>
        No tienes permisos para acceder a esta página.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 4, backgroundColor: "white", color: "#00CED1", "&:hover": { backgroundColor: "#E0FFFF" } }}
        onClick={() => navigate("/")}
      >
        Volver al Home
      </Button>
    </Box>
  );
};