const columnas = [
  {
    accessorFn: (row) =>
      row.ent_sal === "R/E"
        ? (row.Co_tdoc !== null ? row.Co_tdoc.Co_docu : "-") +
        "." +
        row.Num_unidad_reg.Num_unidad_reg +
        "." +
        row.num_reg +
        "." +
        row.year.slice(-2)
        : "",
    header: "R/E",
    muiTableHeadCellProps: {
      align: "center",
    },
    enableColumnOrdering: false,
    enableEditing: false, //disable editing on this column
    enableSorting: false,
    size: 80,
    footer: "R/S",
  },
  {
    accessorFn: (row) =>
      row.ent_sal === "R/S"
        ? (row.Co_tdoc !== null ? row.Co_tdoc.Co_docu : "-") +
        "." +
        row.Num_unidad_reg.Num_unidad_reg +
        "." +
        row.num_reg +
        "." +
        row.year.slice(-2)
        : "",
    header: "R/S",
    muiTableHeadCellProps: {
      align: "center",
    },
    enableColumnOrdering: false,
    enableEditing: false, //disable editing on this column
    enableSorting: false,
    size: 80,
    footer: "R/S",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 20,
  },
  {
    accessorKey: "denomindoc",
    header: "Denominación del Documento",
    size: 300,
  },
  {
    accessorFn: (row) =>
      row.ent_sal === "R/E" ? (row.Co_pdest !== null ? row.Co_pdest.descripcionpdest : "-") : "",
    header: "Procedencia",
  },
  {
    accessorFn: (row) =>
      row.ent_sal === "R/S" ? (row.Co_pdest !== null ? row.Co_pdest.descripcionpdest : "-")  : "",
    header: "Destino",
  },
  {
    accessorKey: "numejemp",
    header: "Ejemplares",
    size: 50,
  },
  {
    accessorKey: "Co_tipsal.Desc_tipsal",
    id: "Co_tipsal",
    header: "Tipo Salidad",
  },
  {
    accessorKey: "Co_nombre.datosgenerales",
    id: "Co_nombre",
    header: "Firma",
    footer: "Firma",
    size: 200,
  },
];

export default columnas
