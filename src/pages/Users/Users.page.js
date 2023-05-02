import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-context";

import { Typography } from "@mui/material";

import messageAlert from "../../components/messageAlert";
import CustomTable from "../../components/customTable";
import columnas from "./columnas";
import { Formulario } from "./Formulario";

import { AXIOSCONST } from "../../constants";
import { BackendService } from "../../services";

function Users() {
  const { usuario, CustomMsgError, setMsgSuccess } = useAuthContext();

  const [dataTable, setDataTable] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [open, setOpen] = useState(false);
  const [postedit, setPostEdit] = useState("post");
  const [currentrow, setCurrentRow] = useState([]);
  const [edited, setEdited] = useState(true);

  //Función para cerrar el modal
  const CloseModal = async (data) => {
    setEdited(data);
    setOpen(false);
  };

  //Obtener Unidades-------------------------------------------
  const ObtenerUsuarios = async () => {
    setCargando(true);

    const result = await BackendService._get(
      AXIOSCONST.USERSBYUNIT + "/" + usuario.idUnidad
    );

    //Poner mensaje de error de producirce
    if (result.statusCode === 200) {
      await setDataTable(result.data);
      CustomMsgError(null);
    } else {
      CustomMsgError(result);
    }

    setTimeout(() => {
      setCargando(false);
    }, 500);
  };

  //------------------------------------------------
  useEffect(() => {
    if (!open && edited) ObtenerUsuarios();
    // eslint-disable-next-line
  }, [open]);

  //Eliminar un registro----------------------------
  const handleClickDelete = async (row) => {
    messageAlert().then(async (result) => {
      if (result.isConfirmed) {
        setMsgSuccess(null);
        CustomMsgError(null);

        const resp = await BackendService._delete(
          AXIOSCONST.USERS + "/" + row.original.id
        );

        console.warn("error al borrar", resp);

        if (resp.statusCode === 200) {
          dataTable.splice(row.index, 1);
          setDataTable([...dataTable]);

          setMsgSuccess("Registro eliminado satisfactoriamente");
        } else {
          CustomMsgError(resp);
        }
      }
    });
  };

  //------------------------------------------------
  return (
    <>
      <Formulario
        open={open}
        onClose={CloseModal}
        postedit={postedit}
        currentrow={currentrow}
      />

      <Typography variant="h4" color="initial" sx={{ ml: 2 }}>
        Usuarios
      </Typography>

      <CustomTable
        columnas={columnas}
        dataTable={dataTable}
        setPostEdit={setPostEdit}
        setOpen={setOpen}
        setCurrentRow={setCurrentRow}
        handleClickDelete={handleClickDelete}
        state={{
          isLoading: cargando,
          sorting: [{ desc: false }],
        }}
      />
    </>
  );
}

export default Users;
