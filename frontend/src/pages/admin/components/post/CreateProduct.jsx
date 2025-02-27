import {
  Create,
  SimpleForm,
  TextInput,
  SaveButton,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { Grid, Box, Container } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;
import Swal from "sweetalert2";
import { createProduct } from "../../../../services/productService";

export const validatePostCreation = (values) => {
  const errors = {};
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;

  if (
    !values.Imagenes ||
    !Array.isArray(values.Imagenes) ||
    values.Imagenes.some((img) => !urlPattern.test(img))
  ) {
    errors.Imagenes = "Todas las imágenes deben ser URLs válidas.";
  }

  if (!values.Nombre || values.Nombre.length < 5) {
    errors.Nombre = "El nombre debe tener al menos 5 caracteres.";
  }

  if (!values.Descripcion || values.Descripcion.length < 5) {
    errors.Descripcion = "La descripción debe tener al menos 5 caracteres.";
  }

  if (!values.Precio || isNaN(Number(values.Precio))) {
    errors.Precio = "El precio debe ser un número válido.";
  }

  return errors;
};

export const PostCreate = () => {
  const handleSubmit = async (values) => {
    const productBody = {
      name: values.Nombre,
      description: values.Descripción,
      price: parseFloat(values.Precio),
      imageSet: values.Imagenes.map((imgUrl) => ({
        imageUrl: imgUrl,
        altText: `Imagen de ${values.Nombre}`,
      })),
    };

    try {
      const response = await createProduct(productBody);
      console.log("🚀 ~ Producto creado:", response);
      if (!response) {
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Producto creado correctamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto.",
      });
    }
  };

  return (
    <Create
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      label="Crear producto"
    >
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <SimpleForm toolbar={false} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="Nombre" label="Nombre" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SelectInput
                source="Categoría"
                label="Categoría"
                defaultValue="todas"
                choices={[
                  { id: "aventura", name: "Aventura" },
                  { id: "gastronomia", name: "Gastronomía" },
                  { id: "bienestar", name: "Bienestar" },
                  { id: "cultura", name: "Cultura" },
                  { id: "todas", name: "Todas" },
                ]}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextInput
                source="Descripción"
                label="Descripción"
                fullWidth
                multiline
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextInput source="Precio" label="Precio" fullWidth />
            </Grid>

            <Grid item xs={12}>
              Debe ingresar por lo menos cinco imagenes
              <ArrayInput source="Imagenes" label="Imágenes (URLs)">
                <SimpleFormIterator>
                  <TextInput label="URL de imagen" />
                </SimpleFormIterator>
              </ArrayInput>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
              <Box mt={2}>
                <SaveButton
                  label="Crear"
                  sx={{
                    backgroundColor: "#00CED1",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: "10px 30px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "100%",
                    "&:hover": {
                      backgroundColor: "#00B3B3",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </SimpleForm>
      </Container>
    </Create>
  );
};
