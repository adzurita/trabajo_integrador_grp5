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

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = () => (
  <Edit title="Editar un producto"  >
    <SimpleForm >
      <TextInput source="Imagen" label="Url de la imagen" />
      <TextInput source="Nombre" />
      <TextInput source="Descripción" options={{ multiline: true }} />
      <TextInput source="Precio" />
      <TextInput source="Categoría" />
      <TextInput source="Status" />
    </SimpleForm>
  </Edit>
);
