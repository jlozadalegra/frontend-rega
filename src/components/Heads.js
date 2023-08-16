import { useState, useEffect } from "react";

import { Link as LinkRouter } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Link,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {
  AccountCircle,
  Person,
  Business,
  Password,
  Logout,
} from "@mui/icons-material";

import { useAuthContext } from "../contexts/auth-context";
import TokenService from "../services/token.service";
import MenuAdmin from "./MenuAdmin";

export default function Heads() {
  const { usuario, setUsuario } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const [fullName, setFullName] = useState("");
  const [unitName, setUnitName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const existToken = async () => {
      const token = await TokenService.GetAccessToken();

      if (token) {
        setFullName(usuario.usuario);
        setUnitName(usuario.unidad);
        setIsAdmin(usuario.admin === "SI");
      }
    };

    existToken();
  }, [usuario]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogup = (e) => {
    e.preventDefault();
    handleClose();
    TokenService.RemoveUser();
    setUsuario(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton aria-label="menu" color="inherit">
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Box
                  sx={{
                    mr: 2,
                    display: { xs: "block", sm: "flex", md: "flex" },
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Box className="boxlink">
                    <Link
                      component={LinkRouter}
                      to="/"
                      color="inherit"
                      underline="hover"
                      variant="h6"
                    >
                      Inicio
                    </Link>
                  </Box>
                  <Box className="boxlink">
                    <Link
                      component={LinkRouter}
                      to="/rega"
                      color="inherit"
                      underline="hover"
                      variant="h6"
                    >
                      Rega
                    </Link>
                  </Box>

                  {isAdmin && (
                    <Box className="boxlink" display={"block"}>
                      <MenuAdmin />
                    </Box>
                  )}
                </Box>
              </Box>

              <Box sx={{ flexGrow: 0, display: "inline-flex" }}>
                <IconButton aria-label="acount" onClick={handleClick}>
                  <AccountCircle sx={{ color: "white" }} />
                </IconButton>
                <Menu
                  id="MenuUsers"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Person sx={{ mr: 2 }} /> {fullName}
                  </MenuItem>
                  <MenuItem>
                    <Business sx={{ mr: 2 }} /> {unitName}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Password sx={{ mr: 2 }} /> Cambiar Contraseña
                  </MenuItem>
                  <MenuItem onClick={handleClickLogup}>
                    <Logout sx={{ mr: 2 }} /> Cerrar Sesión
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}
