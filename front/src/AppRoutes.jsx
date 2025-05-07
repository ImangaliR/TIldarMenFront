import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./utils/contexts/UserContext";
import BaseLayout from "./components/layout/BaseLayout";
import ProtectedRoute from "./components/rounting/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";
import Signup from "./pages/Login/Signup";
import Home from "./pages/Home/Home";
import ProjectCatalog from "./pages/Home/Project_Catalog";
import Translators from "./pages/Home/Translators";
import Profile from "./pages/Profile/Profile";
import Reviews from "./pages/Profile/Reviews";
import Settings from "./pages/Profile/Settings";
import TranslatorPage from "./pages/Translator/TranslatorPage";
import ProfileEditing from "./pages/Profile/ProfileEditing";
import AppliedProjects from "./pages/Profile/AppliedProjects";
import EmployerPage from "./pages/Employer/EmployerPage";
import Payment from "./pages/Profile/Payment";
import PostProjects from "./pages/Profile/PostProjects";
import ProjectApplicants from "./pages/Profile/ProjectApplicants";
import RoleBasedRoute from "./components/rounting/RoleBasedRoute.jsx/RoleBasedRoute";
import TranslatorDetails from "./pages/Home/TranslatorDetails";
import CreateProject from "./pages/Profile/CreateProject";
import ForgotPassword from "./pages/Login/ForgotPassword";
import EditProject from "./pages/Profile/EditProject";

const AppRoutes = () => {
  const { userRole, userId } = useUser();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route index element={<Navigate to="/home" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="project-catalog" element={<ProjectCatalog />} />
      <Route path="translators" element={<Translators />}>
        <Route path="translator-details/:id" element={<TranslatorDetails />} />
      </Route>

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
          {/* <Route path="settings" element={<Settings />} /> */}

          {/* Translator Routes */}
          <Route element={<RoleBasedRoute allowedRoles={"TRANSLATOR"} />}>
            <Route path="translator" element={<TranslatorPage />}>
              <Route path="profile-edit" element={<ProfileEditing />} />
              <Route path="applied-projects" element={<AppliedProjects />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Employer Routes */}
          <Route element={<RoleBasedRoute allowedRoles={"EMPLOYER"} />}>
            <Route path="employer" element={<EmployerPage />}>
              <Route path="payment" element={<Payment />} />
              <Route path="post-projects" element={<PostProjects />}>
                <Route path="create-project" element={<CreateProject />} />
                <Route
                  path="project-applicants/:id"
                  element={<ProjectApplicants />}
                />
                <Route path="edit-project/:id" element={<EditProject />} />
              </Route>
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
