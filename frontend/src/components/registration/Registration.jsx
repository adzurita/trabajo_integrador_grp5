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

  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
    // setErrors({ ...errors, [name]: "" });
    setErrors({}); 
  };

  const validateFields = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!registrationData.firstname.trim()) {
      newErrors.firstname = "El nombre es obligatorio.";
    } else if (!nameRegex.test(registrationData.firstname)) {
      newErrors.firstname = "El nombre solo puede contener letras.";
    } else if (registrationData.firstname.length < 2) {
      newErrors.firstname = "El nombre debe tener al menos 2 caracteres.";
    }

    if (!registrationData.lastname.trim()) {
      newErrors.lastname = "El apellido es obligatorio.";
    } else if (!nameRegex.test(registrationData.lastname)) {
      newErrors.lastname = "El apellido solo puede contener letras.";
    } else if (registrationData.lastname.length < 2) {
      newErrors.lastname = "El apellido debe tener al menos 2 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registrationData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!emailRegex.test(registrationData.email)) {
      newErrors.email = "Ingresa un email válido.";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!registrationData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (!passwordRegex.test(registrationData.password)) {
      newErrors.password =
        "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    if (!checked) {
      newErrors.checkbox = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const response = await registerUser(registrationData);

        setRegistrationData({ firstname: "", lastname: "", email: "", password: "" });
      
      setOpen(false);
      setChecked(false);
      setErrors({});
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
                autoComplete="off"
                value={registrationData.firstname}
                error={!!errors.firstname}
              />
              {errors.firstname && (
                <Typography sx={{ color: "red", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
                  {errors.firstname}
                </Typography>
              )}

              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Apellido"
                onChange={handleInputChange}
                name="lastname"
                autoComplete="off"
                value={registrationData.lastname}
                error={!!errors.lastname}
              />
               {errors.lastname && (
                  <Typography sx={{ color: "red", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
                    {errors.lastname}
                  </Typography>
                )}

              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Email"
                onChange={handleInputChange}
                name="email"
                autoComplete="off"
                value={registrationData.email}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography sx={{ color: "red", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
                  {errors.email}
                </Typography>
              )}
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Contraseña"
                onChange={handleInputChange}
                name="password"
                type="password"
                autoComplete="off"
                value={registrationData.password}
                error={!!errors.password}
              />
            </Box>
            {errors.password && (
              <Typography sx={{ color: "red", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
                {errors.password}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
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
            {errors.termsAccepted && <Typography sx={{ color: "red", fontSize: "12px" }}>{errors.termsAccepted}</Typography>}
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
