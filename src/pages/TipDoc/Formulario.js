import style from "../../styles/style";

import { Box, Modal, Grid, Button, Typography } from "@mui/material";

import { Formik, Form, Field } from "formik";

import { TextField } from "formik-mui";

import { useAuthContext } from "../../contexts/auth-context";

import { AXIOSCONST } from "../../constants";
import { BackendService } from "../../services";

export function Formulario({ open, onClose, postedit, currentrow }) {
  const { CustomMsgError, setMsgSuccess } = useAuthContext();

  //Guardar nuevo registro--------------------------------------------------------------------------------------
  const newrecord = async (value) => {
    setMsgSuccess(null);
    CustomMsgError(null);

    //Guardar un registro
    const resp = await BackendService._insert(AXIOSCONST.TIPDOC, value);

    onClose(true); //Cierra el modal

    if (resp.statusCode === 200) {
      setMsgSuccess("Registro guardado satisfactoriamente");
    } else {
      CustomMsgError(resp);
    }
  };

  //Actualizar nuevo registro----------------------------------------------------------------------------------
  const updaterecord = async (value) => {
    setMsgSuccess(null);
    CustomMsgError(null);

    const resp = await BackendService._update(
      AXIOSCONST.TIPDOC + "/" + currentrow.id,
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
            Desc_docu: postedit === "edit" ? currentrow.Desc_docu : "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.Desc_docu) {
              errors.Desc_docu = "Este campo es obligatorio";
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
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    id="Desc_docu"
                    name="Desc_docu"
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
