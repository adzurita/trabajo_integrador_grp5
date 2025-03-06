import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import "./styles.css";

const namespace = "registration";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  width: "600px",
  minHeight: "auto",
  borderRadius: "10px",
};

export const Registration = ({ open, setOpen, handleOpen }) => {
  const handleClose = () => setOpen(false);

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
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Apellido"
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Email"
              />
              <TextField
                sx={{ backgroundColor: "white", width: "100%" }}
                placeholder="Contraseña"
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