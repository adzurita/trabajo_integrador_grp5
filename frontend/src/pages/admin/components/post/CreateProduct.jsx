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
import { validatePostCreation } from "../../../../helpers/index";

export const PostCreate = () => (
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
      <SimpleForm toolbar={false} validate={validatePostCreation}>
        <Grid container spacing={2}>
          {/* Nombre */}
          <Grid item xs={12} sm={6}>
            <TextInput source="nombre" label="Nombre" fullWidth />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="categoria"
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

          {/* Descripción */}
          <Grid item xs={12}>
            <TextInput source="descripcion" label="Descripción" fullWidth multiline />
          </Grid>

          {/* Precio */}
          <Grid item xs={12} sm={6}>
            <TextInput source="precio" label="Precio" fullWidth />
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="status"
              label="Estado"
              defaultValue="disponible"
              choices={[
                { id: "disponible", name: "Disponible" },
                { id: "no_disponible", name: "No disponible" },
              ]}
              fullWidth
            />
          </Grid>

          {/* Múltiples URLs de imágenes */}
          <Grid item xs={12}>
            <ArrayInput source="imagenes" label="Imágenes (URLs)">
              <SimpleFormIterator>
                <TextInput label="URL de imagen" />
              </SimpleFormIterator>
            </ArrayInput>
          </Grid>

          {/* Botón Crear */}
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