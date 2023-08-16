import { Outlet } from "react-router-dom";

import Heads from "./Heads";

function Layout() {
  return (
    <div>
      <Heads />
      <Outlet />
    </div>
  );
}

export default Layout;
