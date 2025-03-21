import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { standaloneRoutes } from "./standaloneRoutes";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../store/slices/auth.slice";
import RenterLayout from "../components/Layout/RenterLayout";
import AdminLayout from "../components/Layout/AdminLayout";
import { adminRoutes } from "./adminRoutes";
import { renterRoutes } from "./renterRoutes";
import LandlordLayout from "../components/Layout/LandlordLayout";
import { landLordRoutes } from "./landLordRoutes";
import { moderatorRoutes } from "./moderatorRoutes";
import ModeratorLayout from "../components/Layout/ModeratorLayout";

export default function AppRoutes() {
  const userRole = useSelector(selectUserProfile).roles[0];
  return (
    <Routes>
      {userRole === "RENTER" && (
        <Route path="/" element={<RenterLayout />}>
          {renterRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      )}

      {userRole === "ADMIN" && (
        <Route path="/" element={<AdminLayout />}>
          {adminRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      )}

      {userRole === "LANDLORD" && (
        <Route path="/" element={<LandlordLayout />}>
          {landLordRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      )}

      {userRole === "MODERATOR" && (
        <Route path="/" element={<ModeratorLayout />}>
          {moderatorRoutes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Route>
      )}

      {standaloneRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} />
      ))}
    </Routes>
  );
}
