import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const Login = ({ open, handleClose, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validCredentials = {
    email: "prueba@yopmail.com",
    password: "123456",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
/*     if (
      email !== validCredentials.email ||
      password !== validCredentials.password
    ) {
      setError("Datos incorrectos. Inténtalo de nuevo.");
      return;
    }
 */
    handleLogin(email, password);
    setError("");
    setEmail("");
    setPassword("");
    handleClose();
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#00CED1",
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          gutterBottom
        >
          Inicia sesión para acceder a lo mejor de Xplora+
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handleInputChange(setPassword)}
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          <Typography
            variant="body2"
            textAlign="right"
            sx={{ color: "#00CED1", cursor: "pointer", mt: 1 }}
          >
            ¿Has olvidado tu contraseña?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#00CED1", color: "white" }}
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
