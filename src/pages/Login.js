import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { MenuItem, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { Select, TextField } from "formik-mui";

import { AuthService } from "../services";
import { useAuthContext } from "../contexts/auth-context";

import { AXIOSCONST } from "../constants";
import { BackendService } from "../services";

export default function Login() {
  const { setUsuario, CustomMsgError } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState("");

  const [unidades, setUnidades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isUnidad, setIsUnidad] = useState(true);
  const [isUsuario, setIsUsuario] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    //Cargar undades-------------------------------------------------------
    const cargarUnidades = async () => {
      CustomMsgError(null);

      const result = await BackendService._get(AXIOSCONST.UNITS);

      if (result.statusCode === 200) {
        await setUnidades(result.data);
      } else {
        CustomMsgError(result);
      }
    };

    cargarUnidades();
  }, [CustomMsgError]);

  //Si se a seleccionado una unidad cargar los usuarios
  const handleUnit = async (e) => {
    CustomMsgError(null);

    const result = await BackendService._get(
      AXIOSCONST.USERSBYUNIT + "/" + e.target.value
    );

    if (result.statusCode === 200) {
      setUsuarios(result.data);
      setIsUnidad(false);
    } else {
      CustomMsgError(result);
    }
  };

  const handleUser = async () => {
    setIsUsuario(false);
  };

  return (
    <Formik
      initialValues={{
        unidad: "",
        usuario: "",
        password: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.unidad) {
          errors.unidad = "La Unidad es requerida";
        }

        if (!values.usuario) {
          errors.usuario = "El Usuario es requerido";
        }

        if (!values.password) {
          errors.password = "La contraseña es requerida";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        setSubmitting(false);
        setErrorMsg(null);
        CustomMsgError(null);

        const obtenerLogin = async () => {
          const resul = await AuthService.login(
            values.usuario,
            values.password
          );

          //Si el usuario y la contraseñas son correctas
          if (resul.statusCode === 200) {
            setUsuario(resul.data);
            navigate(from, { replace: true });
          } else {
            CustomMsgError(resul);
          }

          //si la contraseña es incorrecta
          if (resul.statusCode === 401)
            setFieldError("password", resul.message);
        };

        obtenerLogin();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{
              minHeight: "100vh",
              minWidth: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
            }}
          >
            <Box sx={{ width: "400px" }}>
              <Paper elevation={12} sx={{ padding: 5 }}>
                <Grid item sx={{ marginBottom: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="red">
                    {errorMsg}
                  </Typography>
                  <Typography variant="body1" color="initial">
                    Inicio de Sesión
                  </Typography>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={Select}
                    id="unidad"
                    name="unidad"
                    label="Unidad"
                    onChange={handleUnit}
                    sx={{ minWidth: "320px", maxWidth: "320px" }}
                  >
                    {unidades.map((elemento) => (
                      <MenuItem value={elemento.id}>
                        {elemento.descripcionureg}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={Select}
                    id="usuario"
                    name="usuario"
                    label="Usuario"
                    disabled={isUnidad}
                    onChange={handleUser}
                    sx={{ minWidth: "320px", maxWidth: "320px" }}
                  >
                    {usuarios &&
                      usuarios.map((elemento) => (
                        <MenuItem value={elemento.id}>
                          {elemento.datosgenerales}
                        </MenuItem>
                      ))}
                  </Field>
                </Grid>
                <Grid item sx={{ marginBottom: 2 }}>
                  <Field
                    component={TextField}
                    id="password"
                    name="password"
                    label="Contraseña"
                    disabled={isUsuario}
                    sx={{ minWidth: "320px" }}
                    type="password"
                  />
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Aceptar
                  </Button>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
