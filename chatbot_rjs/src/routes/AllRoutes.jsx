import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { instance } from "../config/axios_config";
import { useEffect } from "react";
import Files_List from "../pages/Files_List";
import Chat_Page from "../pages/Chat_Page";
import MyProfile from "../pages/MyProfile";
import AdminLogin from "../pages/avatar_management/Login.jsx";
import AllAvatars from "../pages/avatar_management/Avatars.jsx";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/DashboardLayout";
import EmailVerification from "../pages/EmailVerification.jsx";

function Logout() {
  const navigate = useNavigate();
  const makeLogout = async () => {
    await instance.post("/logout");
    navigate("/signin");
  };
  useEffect(() => {
    makeLogout();
  }, []);
  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/avatars" element={<AllAvatars />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/uploaded_files"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Files_List />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat_interface"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Chat_Page />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/me"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MyProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
