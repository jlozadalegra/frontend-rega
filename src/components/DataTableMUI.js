import { Button } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { MessageSuccess } from "../helpers/ShowMessage";

function DataTableMUI(props) {
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 10,
          },
        }}
        columns={props.column}
        data={props.data}
        enableColumnOrdering
        localization={MRT_Localization_ES}
        enableStickyHeader
        enableRowActions
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              console.log("asasasasdsd");
              MessageSuccess("muestra");
            }}
          >
            Agregar
          </Button>
        )}
        state={{
          isLoading: props.isLoading,
        }}
      />
    </>
  );
}

export default DataTableMUI;
