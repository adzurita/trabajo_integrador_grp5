// in posts.js
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
      <ImageField source="Imagen" title="Imagen del producto" sx={{ width: 50, height: 50 }} />
      <TextField source="Nombre" />
      <TextField source="Descripción" options={{ multiline: true }} />
      <TextField source="Precio" />
      <TextField source="Categoría" />
      <TextField source="Status" />

      <EditButton />
    </Datagrid>
  </List>
);

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
    <TextInput source="Imagen" label="Url de la imagen" />
      <TextInput source="Nombre" />
      <TextInput source="Descripción" options={{ multiline: true }} />
      <TextInput source="Precio" />
      <TextInput source="Categoría" />
      <TextInput source="Status" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create title="Create a Post">
    <SimpleForm>
      <TextInput source="Imagen" label="Url de la imagen" />
      <TextInput source="Nombre" />
      <TextInput source="Descripción" options={{ multiline: true }} />
      <TextInput source="Precio" />
      <TextInput source="Categoría" />
      <TextInput source="Status" />
    </SimpleForm>
  </Create>
);
