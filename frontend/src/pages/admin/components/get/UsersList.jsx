import { useEffect, useState } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  useRecordContext,
  TopToolbar,
  CreateButton,
  FunctionField,
} from "react-admin";

import { getUsers, updateUserRole } from "../../../../services/productService";
import { CustomDeleteButton } from "../deleteButton/DeleteButton";

export const PostIcon = BookIcon;

const RoleField = () => {
  const record = useRecordContext();
  const [role, setRole] = useState(record.role);
  const handleChange = async (event) => {
    const newRole = event.target.value;
    setRole(newRole);
    try {
      await updateUserRole(record.id, newRole);
      console.log(`Rol de usuario ${record.id} actualizado a ${newRole}`);
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
    }
    window.reload()
  };

  return (
    <Select
      value={role}
      onChange={handleChange}
      size="small"
      sx={{
        width: "160px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        "& .MuiSelect-select": {
          padding: "10px",
        },
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        "&.Mui-focused": {
          backgroundColor: "#ffffff",
          border: "2px solid #00B3B3",
        },
      }}
    >
      <MenuItem
        value="USER"
        sx={{ "&:hover": { backgroundColor: "#00B3B3", color: "white" } }}
      >
        Usuario
      </MenuItem>
      <MenuItem
        value="ADMIN"
        sx={{ "&:hover": { backgroundColor: "#00B3B3", color: "white" } }}
      >
        Administrador
      </MenuItem>
      <MenuItem
        value="SUPERADMIN"
        sx={{ "&:hover": { backgroundColor: "#00B3B3", color: "white" } }}
      >
        Super Administrador
      </MenuItem>
    </Select>
  );
};

export const UsersLists = () => {
  const [users, setUsers] = useState([]);
  

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log("🚀 ~ getUsers ~ data:", data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <List
      sx={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
      }}
      title="Lista de usuarios"
      bulkActionButtons={false}
      exporter={false}
    >
      <Box>
        <Datagrid
          rowClick={null}
          bulkActionButtons={false}
          data={users}
          sx={{
            "& .RaDatagrid-headerCell": {
              fontWeight: "bold",
              backgroundColor: "#00B3B3",
              color: "white",
            },
          }}
          empty={
            <div style={{ textAlign: "center", padding: "20px" }}>
              Aún no se ha registrado usuarios.
            </div>
          }
        >
          <TextField source="id" sx={{ width: "50px" }} />
          <TextField
            source="firstname"
            label="Nombre"
            sx={{ width: "200px" }}
          />
          <TextField
            source="lastname"
            label="Apellido"
            sx={{ width: "200px" }}
          />
          <TextField source="email" label="Email" sx={{ width: "200px" }} />
          <TextField
            source="username"
            label="UserName"
            sx={{ width: "200px" }}
          />
          <TextField source="role" label="Rol" sx={{ width: "200px" }} />
          <FunctionField label="Rol" render={() => <RoleField />} />
        </Datagrid>
      </Box>
    </List>
  );
};
