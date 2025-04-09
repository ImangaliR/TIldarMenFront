import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./utils/contexts/UserContext";
import TokenService from "./services/token.service";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Translators from "./pages/Home/Translators";
import Profile from "./pages/Profile/Profile";
import ProjectCatalog from "./pages/Home/Project_Catalog";
import ProtectedRoute from "./components/rounting/ProtectedRoute/ProtectedRoute";
import RoleBasedRoute from "./components/rounting/RoleBasedRoute.jsx/RoleBasedRoute";
import TranslatorPage from "./pages/Translator/TranslatorPage";
import EmployerPage from "./pages/Employer/EmployerPage";
import Settings from "./pages/Profile/Settings";
import PostProjects from "./pages/Profile/PostProjects";
import ProjectApplicants from "./pages/Profile/ProjectApplicants";
import Payment from "./pages/Profile/Payment";
import Reviews from "./pages/Profile/Reviews";
import AppliedProjects from "./pages/Profile/AppliedProjects";
import ProfileEditing from "./pages/Profile/ProfileEditing";
import BaseLayout from "./components/layout/BaseLayout";

function App() {
  const userRole = useMemo(() => TokenService.getUserRole(), []);
  const userId = useMemo(() => TokenService.getUserId(), []);

  return (
    <>
      <Router>
        <UserProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="project-catalog" element={<ProjectCatalog />} />
            <Route path="translators" element={<Translators />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute
                  isAllowed={!!userRole && !!userId}
                  redirectPath="/login"
                />
              }
            >
              <Route element={<BaseLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="reviews" element={<Reviews />} />

                {/* Translator Routes */}
                <Route element={<RoleBasedRoute allowedRoles={"TRANSLATOR"} />}>
                  <Route path="translator" element={<TranslatorPage />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="profile-edit" element={<ProfileEditing />} />
                  <Route
                    path="applied-projects"
                    element={<AppliedProjects />}
                  />
                </Route>

                {/* Employer Routes */}
                <Route element={<RoleBasedRoute allowedRoles={"EMPLOYER"} />}>
                  <Route path="employer" element={<EmployerPage />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="post-projects" element={<PostProjects />} />
                  <Route
                    path="project-applicants"
                    element={<ProjectApplicants />}
                  />
                </Route>
              </Route>
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
