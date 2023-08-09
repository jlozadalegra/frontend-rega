import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home/index";
import PageNotFound from "./pages/PageNotFound";
import RequireAuth from "./components/RequireAuth";
import Head from "./components/head";

import { useAuthContext } from "./contexts/auth-context";
import {
  Areas,
  Login,
  RegRega,
  Units,
  Users,
  ProcDest,
  DashBoard,
  TipDoc,
  TipSop,
  Unauthorized,
} from "./pages";

function App() {
  const { usuario } = useAuthContext();

  return (
    <>
      {usuario && <Head />}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth allowedRoles={["NO", "SI"]} />}>
            <Route path="/" element={<DashBoard />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["NO", "SI"]} />}>
            <Route path="/rega" element={<RegRega />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["SI"]} />}>
            <Route path="/users" element={<Users />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/units" element={<Units />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/procdest" element={<ProcDest />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/tipdoc" element={<TipDoc />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/areas" element={<Areas />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/tipsop" element={<TipSop />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["NO", "SI"]} />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
