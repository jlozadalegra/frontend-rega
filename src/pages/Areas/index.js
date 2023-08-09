import { useState } from "react";
import { Button, Typography, Container, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";

function Index() {
  const [showFrom, setShowForm] = useState(false);

  const toogleForm = () => {
    setShowForm(!showFrom);
  };

  return (
    <div>
      <Typography variant="h4" color="initial" margin={2}>
        Áreas
      </Typography>
      <Button onClick={toogleForm}>Nuevo</Button>
      {showFrom && (
        <Container>
          <Typography color="darkred" variant="h6" gutterBottom>
            Nueva Área
          </Typography>

          <Formik
            initialValues={{
              Desc_tipsal: "", //postedit === "edit" ? currentrow.Desc_tipsal : "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.Desc_tipsal) {
                errors.Desc_tipsal = "Este campo es obligatorio";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);

              //Funcion que permite guardar el nuevo registro
              //if (postedit === "post") newrecord(values);
              //if (postedit === "edit") updaterecord(values);
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                <Stack spacing={1} alignContent={"center"}>
                  <Field
                    component={TextField}
                    id="Desc_tipsal"
                    name="Desc_tipsal"
                    type="text"
                    label="Descripción"
                    sx={{ width: "500px" }}
                  />

                  <Stack direction="row" spacing={1} alignItems={"center"}>
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
                        //onClose(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Container>
      )}
    </div>
  );
}

export default Index;
