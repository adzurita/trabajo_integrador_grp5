import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  DeleteButton,
  TextInput,
  DateInput,
  useRecordContext,
  ImageInput,
  ImageField,
  useDataProvider,
} from "react-admin";
import BookIcon from "@mui/icons-material/Book";
import { Box } from "@mui/material";

export const PostIcon = BookIcon;

import { TopToolbar, CreateButton } from "react-admin";
import { useEffect, useState } from "react";

import { getProducts } from "../../../../services/productService";

const MultipleImageField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;

  return (
    <Box display="flex" gap={1}>
      {record[source].map((img, index) => (
        <img
          key={img.id || index}
          src={img.imageUrl} // Accede a imageUrl
          alt={`Imagen ${index + 1}`}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "5px",
            border: "1px solid #ddd",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      ))}
    </Box>
  );
};

const CustomListActions = () => (
  <TopToolbar>
    <CreateButton
      label="Registrar nuevo producto"
      sx={{
        backgroundColor: "#00CED1",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        padding: "5px 20px",
        fontWeight: "bold",
        textTransform: "none",
        width: "100%",
        "&:hover": {
          backgroundColor: "#00B3B3",
        },
      }}
    />
  </TopToolbar>
);

export const PostList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      console.log(data);
      setProducts(data);
    });
  }, []);

  console.log("🚀 ~ PostList ~ products:", products);

  return (
    <List
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
      title="Lista de productos"
      actions={<CustomListActions />}
      bulkActionButtons={false}
    >
      <Box>
        <Datagrid
          rowClick={null}
          bulkActionButtons={false}
          data={products}
          sx={{
            "& .RaDatagrid-headerCell": {
              fontWeight: "bold",
              backgroundColor: "#00B3B3",
              color: "white",
              padding: "12px 30px",
            },
            "& .RaDatagrid-rowCell": {
              padding: "12px",
            },
            "& .css-efpi9o-MuiTableCell-root.MuiTableCell-sizeSmall": {
              padding: "30px",
            },
          }}
        >
          <TextField source="id" sx={{ width: "50px" }} />
          <MultipleImageField source="imageSet" label="Imagenes" />
          <TextField source="name" label="Nombre" sx={{ width: "200px" }} />
          <TextField
            source="description"
            label="Descripción"
            sx={{
              maxWidth: "300px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <TextField source="price" label="Precio" />
          <TextField source="Categoría" label="Categoría" />
          <TextField source="Status" label="Disponibilidad" />
          <Box display="flex" gap={1} label="Acciones">
            <EditButton
              label="Editar"
              sx={{
                backgroundColor: "#00CED1",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                padding: "5px 20px",
                fontWeight: "bold",
                textTransform: "none",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#00B3B3",
                },
              }}
            />
            <DeleteButton label="Eliminar"/>
          </Box>
        </Datagrid>
      </Box>
    </List>
  );
};
