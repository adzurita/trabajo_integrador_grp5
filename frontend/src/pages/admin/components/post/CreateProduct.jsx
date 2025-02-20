import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateInput,
  useRecordContext,
  ImageInput,
  ImageField,
  Form,
  SaveButton,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { Grid, Box, Container } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;
import fakeDataProvider from "ra-data-fakerest";
import Swal from "sweetalert2";


const data = [
  {
    id: 1,
    Nombre: "Aventura en la Selva Amazónica",
    Destino: "Amazonas, Brasil",
    Descripción:
      "Un emocionante tour de 5 días explorando la selva amazónica con guías expertos.",
    Precio: "1200 USD",
    Duración: "5 días",
    Categoría: "Aventura",
    Imagenes: ["https://wallpaperaccess.com/full/4736716.jpg"],
    Status: "Disponible",
  },
  {
    id: 2,
    Nombre: "Tour por las Pirámides de Egipto",
    Destino: "El Cairo, Egipto",
    Descripción:
      "Descubre las antiguas maravillas del mundo con este tour guiado por Egipto.",
    Precio: "1800 USD",
    Duración: "7 días",
    Categoría: "Cultural",
    Imagenes:
      ["https://estaticos-cdn.prensaiberica.es/clip/6996649c-c464-4f50-9e30-255c27b2015b_source-aspect-ratio_default_0.jpg"],
    Status: "Disponible",
  },
  {
    id: 3,
    Nombre: "Escapada Romántica en París",
    Destino: "París, Francia",
    Descripción:
      "Un tour perfecto para parejas que incluye visitas a los sitios más icónicos de París.",
    Precio: "2500 USD",
    Duración: "4 días",
    Categoría: "Romántico",
    Imagenes:
      ["https://www.infinitaeventos.com/contenido/uploads/2019/01/enamorados-paris.jpg"],
    Status: "Agotado",
  },
];

const dataProvider = fakeDataProvider({
  posts: data,
});



export const validatePostCreation = (values) => {
  const errors = {};
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;

  if (!values.Imagenes || !Array.isArray(values.Imagenes) || values.Imagenes.some((img) => !urlPattern.test(img))) {
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
    // Verificar si el nombre ya existe
    const existingProduct = data.find(
      (post) => post.Nombre?.toLowerCase() === values.Nombre?.toLowerCase()
    );

    if (existingProduct) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ya existe un producto con este nombre.",
      });
      return;
    }

    // Mostrar alerta de éxito
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Producto creado correctamente.",
    });

    console.log("Enviando datos:", values);
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
        <SimpleForm toolbar={false} validate={validatePostCreation} onSubmit={handleSubmit}>
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
              <TextInput source="Descripcion" label="Descripción" fullWidth multiline />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextInput source="Precio" label="Precio" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
              <SelectInput
                source="Status"
                label="Estado"
                defaultValue="disponible"
                choices={[
                  { id: "disponible", name: "Disponible" },
                  { id: "no_disponible", name: "No disponible" },
                ]}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
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