import { useEffect } from "react";
import DataTableMUI from "../../components/DataTableMUI";
import column from "./column";
import { BackendService } from "../../services";
import { useState } from "react";

function View() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //Obtener Tipo e Soporte-----------------------------------------------------------------
    const Obtener = async () => {
      setIsLoading(true);

      const result = await BackendService._get("/areas");

      //Poner mensaje de error de producirce
      if (result.statusCode === 200) {
        await setData(result.data);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    Obtener();

    //if (!open && edited) Obtener();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <DataTableMUI column={column} data={data} isLoading={isLoading} />
    </>
  );
}
export default View;
