import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import DMS from "../modules/DMS";
import AMS from "../modules/AMS";
import OrganizationDashboard from "../pages/OrganizationDashboard";
import OrganizationList from "../pages/OrganizationList";
import AddOrganisation from "../pages/AddOrganisation";
import AppLayout from "../pages/AppLayout";
export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : (
              <Navigate
                to={user.role === "admin" ? "/organizations" : "/dashboard"}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* Admin gets list of organizations */}
        <Route
          path="/organizations"
          element={user ? <OrganizationList /> : <Navigate to="/" />}
        />
        <Route path="/organisation/add" element={<AddOrganisation />} />

        {/* Organization specific dashboard */}
        <Route
          path="/organization/:orgId"
          element={user ? <OrganizationDashboard /> : <Navigate to="/" />}
        />
        <Route path="/organization" element={<OrganizationDashboard />} />

        {/* DMS (protected) */}

        <Route path="/" element={<AppLayout />}>
          <Route path="/dms/*" element={user ? <DMS /> : <Navigate to="/" />} />
          {/* ams module */}
          <Route path="/ams/*" element={user ? <AMS /> : <Navigate to="/" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
