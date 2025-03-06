import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import "./styles.css";
import { registerUser } from "../../services/productService";

const namespace = "registration";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  width: "600px",
  minHeight: "auto",
  borderRadius: "10px",
};

export const Registration = ({ open, setOpen }) => {
  const [registrationData, setRegistrationData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(registrationData);
      if (response?.token) {
        localStorage.setItem("token", response.token); 
        setRegistrationData({ firstname: "", lastname: "", email: "", password: "" });
      }
      setOpen(false);
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Usuario creado correctamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el usuario.",
      });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: 2,
            }}
          >
            <img
              src="src/assets/logo.svg"
              alt="logo xplora+"
              style={{ width: "150px", height: "auto" }}
            />
            <CancelIcon
              sx={{ color: "#00CED1" }}
              fontSize="large"
              onClick={handleClose}
            />
          </Box>
          <Box
            sx={{
              backgroundColor: "#00CED1",
              borderRadius: "80px 0 10px 10px ",
              height: "auto",
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            <div className={`${namespace}-title`}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "white", fontWeight: "bold", fontSize: "40px" }}
              >
                Hola, crea tu cuenta de Xplora+
              </Typography>
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, color: "white" }}
            >
              Registrate para acceder a las mejores experiencias
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "95%",
              }}
            >
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Nombre"
                onChange={handleInputChange}
                name="firstname"
                autocomplete="off"
                value={registrationData.firstname}
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Apellido"
                onChange={handleInputChange}
                name="lastname"
                autocomplete="off"
                value={registrationData.lastname}
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Email"
                onChange={handleInputChange}
                name="email"
                autocomplete="off"
                value={registrationData.email}
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Contraseña"
                onChange={handleInputChange}
                name="password"
                type="password"
                autocomplete="off"
                value={registrationData.password}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              }
              label="Estoy de acuerdo con la privacidad y la política"
              sx={{ color: "white" }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1C274C",
                borderRadius: "10px",
                width: "315px",
                height: "62px",
              }}
              onClick={handleSubmit}
            >
              Regìstrate
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ mt: 2, color: "white" }}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Typography sx={{ mt: 2 }}>Inicia Sesión</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
