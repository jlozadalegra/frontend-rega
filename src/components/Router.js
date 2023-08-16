import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/index";
import RequireAuth from "./RequireAuth";

import Layout from "./Layout";

import {
  Login,
  RegRega,
  Units,
  Users,
  ProcDest,
  DashBoard,
  TipDoc,
  TipSop,
  PageNotFound,
  Unauthorized,
} from "../pages";
import { lazy } from "react";
import { Suspense } from "react";

const Areas = lazy(() => import("../pages/Areas"));

function Router() {
  return (
    <>
      <Suspense fallback={<>...Cargando</>}>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Layout />}>
              <Route element={<RequireAuth allowedRoles={["NO", "SI"]} />}>
                <Route path="/" element={<DashBoard />} />
                <Route path="/rega" element={<RegRega />} />
                <Route path="/home" element={<Home />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={["SI"]} />}>
                <Route path="/users" element={<Users />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                <Route path="/units" element={<Units />} />
                <Route path="/procdest" element={<ProcDest />} />
                <Route path="/tipdoc" element={<TipDoc />} />
                <Route path="areas/*" element={<Areas />} />
                <Route path="/tipsop" element={<TipSop />} />
              </Route>

              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </HashRouter>
      </Suspense>
    </>
  );
}

export default Router;
