import * as React from "react";
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
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;
import { Grid, Box, Container } from "@mui/material";
import { validatePostCreation } from "../../../../helpers/index";


export const PostEdit = () => (
  <Edit title="Editar un producto"     sx={{
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}>
    <Container sx={{ height: "55vh", display: "flex", alignItems: "center" }}>
      <SimpleForm >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput source="Nombre" fullWidth />
          </Grid>
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
          <Grid item xs={12} sm={6}>
            <TextInput source="Descripción" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="Precio" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SelectInput
              source="status"
              label="Status"
              defaultValue="disponible"
              choices={[
                { id: "disponible", name: "Disponible" },
                { id: "no_disponible", name: "No disponible" },
              ]}
              fullWidth
            />
          </Grid>

        </Grid>
      </SimpleForm>
    </Container>
  </Edit>
);
