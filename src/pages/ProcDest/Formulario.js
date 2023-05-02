import style from "../../styles/style";

import { MenuItem, Box, Modal, Grid, Button, Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";

import { TextField, Select } from "formik-mui";

import { useAuthContext } from "../../contexts/auth-context";

import { AXIOSCONST } from "../../constants";
import { BackendService } from "../../services";

export function Formulario({ open, onClose, postedit, currentrow }) {
  const { CustomMsgError, setMsgSuccess } = useAuthContext();

  //Guardar nuevo registro--------------------
  const newrecord = async (value) => {
    setMsgSuccess(null);
    CustomMsgError(null);

    //Guardar un registro
    const resp = await BackendService._insert(AXIOSCONST.PROCDEST, value);

    onClose(true); //Cierra el modal

    if (resp.statusCode === 200) {
      setMsgSuccess("Registro guardado satisfactoriamente");
    } else {
      CustomMsgError(resp);
    }
  };

  //Actualizar nuevo registro---------------------
  const updaterecord = async (value) => {
    setMsgSuccess(null);
    CustomMsgError(null);

    const resp = await BackendService._update(
      AXIOSCONST.PROCDEST + "/" + currentrow.id,
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
            descripcionpdest:
              postedit === "edit" ? currentrow.descripcionpdest : "",
            del_sit: postedit === "edit" ? currentrow.del_sit : "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.descripcionpdest) {
              errors.descripcionpdest = "Este campo es obligatorio";
            }

            if (!values.del_sit) {
              errors.del_sit = "Este campo es obligatorio";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);

            //Funcion que permite guardar el nuevo registro
            if (postedit === "post") newrecord(values);
            if (postedit === "edit") updaterecord(values);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={6}>
                  <Field
                    component={Select}
                    id="del_sit"
                    name="del_sit"
                    label="Del_Sit"
                  >
                    <MenuItem value="Si"> Si </MenuItem>
                    <MenuItem value="No"> No </MenuItem>
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    id="descripcionpdest"
                    name="descripcionpdest"
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
