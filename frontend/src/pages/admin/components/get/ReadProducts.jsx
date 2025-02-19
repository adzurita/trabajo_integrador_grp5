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
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";
export const PostIcon = BookIcon;

export const PostList = () => (
    <List>
      <Datagrid>
        <TextField source="id" />
        <ImageField
          source="Imagen"
          title="Imagen del producto"
          sx={{ width: 50, height: 50 }}
        />
        <TextField source="Nombre" />
        <TextField source="Descripción" options={{ multiline: true }} />
        <TextField source="Precio" />
        <TextField source="Categoría" />
        <TextField source="Status" />
  
        <EditButton />
      </Datagrid>
    </List>
  );