import React, { useEffect, useState } from "react";

import columnas from "./columnas";
import { Formulario } from "./Formulario";

import { Typography } from "@mui/material";

import { useAuthContext } from "../../contexts/auth-context";

import messageAlert from "../../components/messageAlert";
import CustomTable from "../../components/customTable";
import { AXIOSCONST } from "../../constants";
import { BackendService } from "../../services";

const RegRega = () => {
  const { usuario, CustomMsgError, setMsgSuccess } = useAuthContext();
  const [cargando, setCargando] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState(true);
  const [postedit, setPostEdit] = useState("post");
  const [currentrow, setCurrentRow] = useState([]);

  //Iniciar al Renderizar------------------------------------------------------
  useEffect(() => {
    const populateTable = async () => {
      setCargando(true);

      //Obtener los campos de la Tabla por unidad de usuario legueado
      const result = await BackendService._get(
        AXIOSCONST.REGABYUNIT + "/" + usuario.idUnidad
      );

      //Poblar el la tabla
      if (result.statusCode === 200) {
        await setDataTable(result.data);
        CustomMsgError(null);
      } else {
        //Poner mensaje de error de producirce
        CustomMsgError(result);
      }

      setTimeout(() => {
        setCargando(false);
      }, 500);
    };

    if (!open && edited) populateTable();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  //Cerrar el modal-----------------------------------------------------------------
  const CloseModal = async (data) => {
    setEdited(data);
    setOpen(false);
  };

  //Eliminar un registro----------------------------------------------------------------------
  const handleClickDelete = async (row) => {
    console.warn("row", row);
    messageAlert().then(async (result) => {
      if (result.isConfirmed) {
        setMsgSuccess(null);
        CustomMsgError(null);

        const resp = await BackendService._delete(
          AXIOSCONST.REGA + "/" + row.original.Co_reg
        );

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

  //Render-----------------------------------------------------------------
  return (
    <>
      <Typography variant="h4" color="initial" sx={{ ml: 2 }}>
        REGA
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
          sorting: [{ desc: true }],
        }}
      />

      <Formulario
        open={open}
        onClose={CloseModal}
        postedit={postedit}
        currentrow={currentrow}
      />
    </>
  );
};

export default RegRega;
