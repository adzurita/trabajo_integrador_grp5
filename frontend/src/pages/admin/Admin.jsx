import {
  Admin,
  Resource,
  nanoLightTheme,
  nanoDarkTheme,
  Menu,
  Layout,


} from "react-admin";
import fakeDataProvider from "ra-data-fakerest";
import { PostList, PostEdit, PostCreate, PostIcon } from "./components/index";
import LabelIcon from "@mui/icons-material/Label";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";


export const MyMenu = () => {

  return (
    <Menu
      sx={{
        backgroundColor: "#D9D9D9",
        color: "white",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Menu.Item
        to="/admin/posts/create"
        primaryText="Crear Producto"
        leftIcon={<AddBoxRoundedIcon />}
      />
      <Menu.Item
        to="/admin/posts"
        primaryText="Listado de productos"
        leftIcon={<AutoAwesomeMotionRoundedIcon />}
      />
    </Menu>
  );
};



export const MyLayout = ({ children }) => (
  <Layout menu={MyMenu}>{children}</Layout>
);

export const AdminPage = () => {
  const dataProvider = fakeDataProvider({
    posts: [
      {
        id: 1,
        Nombre: "Aventura en la Selva Amazónica",
        Destino: "Amazonas, Brasil",
        Descripción:
          "Un emocionante tour de 5 días explorando la selva amazónica con guías expertos.",
        Precio: "1200 USD",
        Duración: "5 días",
        Categoría: "Aventura",
        Imagen: "https://wallpaperaccess.com/full/4736716.jpg",
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
        Imagen:
          "https://estaticos-cdn.prensaiberica.es/clip/6996649c-c464-4f50-9e30-255c27b2015b_source-aspect-ratio_default_0.jpg",
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
        Imagen:
          "https://www.infinitaeventos.com/contenido/uploads/2019/01/enamorados-paris.jpg",
        Status: "Agotado",
      },
    ],
  });

  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      theme={nanoLightTheme}
      darkTheme={nanoLightTheme}
      layout={MyLayout}
    >
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={PostIcon}
        sx={{border:"2px solid red"}}
      />
    </Admin>
  );
};
