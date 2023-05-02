import React, { useCallback, useEffect, useState } from "react";

import style from "../../styles/style";

import { Box, Modal, MenuItem, Grid, Button, Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";

import { TextField, Select } from "formik-mui";

import { useAuthContext } from "../../contexts/auth-context";
import { AXIOSCONST } from "../../constants";
import { BackendService } from "../../services";

export function Formulario({ open, onClose, postedit, currentrow }) {
  const { usuario, CustomMsgError, setMsgSuccess } = useAuthContext();
  const [tipdoc, setTipDoc] = useState([]);
  const [procdest, setProcDest] = useState([]);
  const [tipsop, setTipSop] = useState([]);

  const ConfigureModal = useCallback(async () => {
    let resul = null;

    //Poblar select Tipo Documento de Calidad
    resul = await BackendService._get(AXIOSCONST.TYPEDOCUM);

    if (resul.statusCode === 200) {
      setTipDoc(resul.data);
    } else {
      CustomMsgError(resul);
    }

    //Poblar select Procedencia Destino
    resul = await BackendService._get(AXIOSCONST.PROCDEST);

    if (resul.statusCode === 200) {
      setProcDest(resul.data);
    } else {
      CustomMsgError(resul);
    }

    //Poblar select Tipo de Soporte
    resul = await BackendService._get(AXIOSCONST.TYPESUPPORT);

    if (resul.statusCode === 200) {
      setTipSop(resul.data);
    } else {
      CustomMsgError(resul);
    }
  }, [CustomMsgError]);

  //llamar a inincio del modal
  useEffect(() => {
    if (open === true) {
      ConfigureModal();
    }
  }, [open, ConfigureModal]);

  //Guardar nuevo registro
  const newrecord = async (value) => {
    console.warn("post", value)

    let date = new Date(Date.now());

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    //crea la constante registro con el usuario y la unidad extraidos del context
    const registro = {
      ...value,
      fecha: String(year + "-" + month + "-" + day),
      year: String(year),
      repartir: "R",
      Co_nombre: usuario.idUsuario,
      Num_unidad_reg: usuario.idUnidad,
    };

    const resp = await BackendService._insert(AXIOSCONST.REGA, registro);

    onClose(true); //Cierra el modal

    if (resp.statusCode === 200) {
      setMsgSuccess("Registro guardado satisfactoriamente");
    } else {
      CustomMsgError(resp);
    }
  };

  //Actualizar nuevo registro
  const updaterecord = async (value) => {
    const resp = await BackendService._update(
      AXIOSCONST.REGA + "/" + currentrow.Co_reg,
      value
    );

    onClose(true); //Cierra el modal

    if (resp.statusCode === 200) {
      setMsgSuccess("Registro actualizado satisfactoriamente");
    } else {
      CustomMsgError(resp.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box>
          <Typography color="darkred" variant="h3" gutterBottom>
            {postedit === "post"
              ? "Insertar Nuevo Registro"
              : "Actualizar Registro"}
          </Typography>
        </Box>
        <Formik
          initialValues={{
            numejemp: postedit === "edit" ? currentrow.numejemp : "",            
            ent_sal: postedit === "edit" ? currentrow.ent_sal : "",
            Co_tdoc: postedit === "edit" ? currentrow.Co_tdoc.id : "",
            Co_pdest: postedit === "edit" ? currentrow.Co_pdest.id : "",
            Co_tipsal: postedit === "edit" ? currentrow.Co_tipsal.id : "",
            denomindoc: postedit === "edit" ? currentrow.denomindoc : "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.numejemp) {
              errors.numejemp = "Required";
            }

            if (!values.ent_sal) {
              errors.ent_sal = "Required";
            }

            if (!values.Co_tdoc) {
              errors.Co_tdoc = "Required";
            }

            if (!values.Co_pdest) {
              errors.Co_pdest = "Required";
            }

            if (!values.Co_tipsal) {
              errors.Co_tipsal = "Required";
            }

            if (!values.denomindoc) {
              errors.denomindoc = "Required";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);

            values.Co_tdoc = parseInt(values.Co_tdoc);
            values.Co_pdest = parseInt(values.Co_pdest);
            values.Co_tipsal = parseInt(values.Co_tipsal);

            //Funcion que permite guardar el nuevo registro
            if (postedit === "post") newrecord(values);
            if (postedit === "edit") updaterecord(values);

            //onClose(false);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="ent_sal"
                    name="ent_sal"
                    labelId="lbles"
                    label="Entrada/Salidad"
                  >
                    <MenuItem value="R/E">Registro de Entrada</MenuItem>
                    <MenuItem value="R/S">Registro de Salidad</MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={TextField}
                    id="numejemp"
                    name="numejemp"
                    type="number"
                    label="Número de Ejemplares"
                  />
                </Grid>

                <Grid item xs={4}>
                  <Field
                    component={Select}
                    id="Co_tipsal"
                    name="Co_tipsal"
                    labelId="lblts"
                    label="Tipo de Soporte"
                  >
                    {tipsop.map((elemento) => (
                      <MenuItem value={elemento.id}>
                        {elemento.Desc_tipsal}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={Select}
                    id="Co_tdoc"
                    name="Co_tdoc"
                    labelId="lbltd"
                    label="Tipo de Documento"
                  >
                    {tipdoc.map((elemento) => (
                      <MenuItem value={elemento.id}>
                        {elemento.Desc_docu}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    component={Select}
                    id="Co_pdest"
                    name="Co_pdest"
                    labelId="lblpd"
                    label="Procedencia o Destino"
                  >
                    {procdest.map((elemento) => (
                      <MenuItem value={elemento.id}>
                        {elemento.descripcionpdest}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    id="denomindoc"
                    name="denomindoc"
                    type="text"
                    label="Descripción"
                  />
                </Grid>

                <Grid
                  item
                  alignItems="center"
                  direction="row"
                  justifyContent="center"
                  xs={12}
                >
                  <div
                    // @ts-ignore
                    className="actionbutton"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Aceptar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        onClose(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
