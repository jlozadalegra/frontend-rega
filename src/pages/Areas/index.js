import { Typography } from "@mui/material";
import React from "react";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const VIEW = lazy(() => import("./view"));
const INSERT = lazy(() => import("./insert"));
const EDIT = lazy(() => import("./edit"));
const DETAIL = lazy(() => import("./detail"));
const PageNotFound = lazy(() => import("../PageNotFound"));

function Areas() {
  return (
    <div>
      <Typography variant="h4" color='initial' margin={2}>Áreas</Typography>
      <Routes>
        <Route index element={<Navigate to="view" />} />
        <Route path="view" element={<VIEW />} />
        <Route path="insert" element={<INSERT />} />
        <Route path="edit" element={<EDIT />} />
        <Route path="detail" element={<DETAIL />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default Areas;
