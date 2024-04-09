import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { instance } from "../config/axios_config";
import { useEffect, useState } from "react";
import Files_List from "../pages/Files_List";
import Chat_Page from "../pages/Chat_Page";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const getAuthStatus = async () => {
    try {
      const res = await instance.get("/authenticated");
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      setIsAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{isAuth ? children : <Navigate to={"/signin"} replace={true} />}</>;
}

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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/uploaded_files"
        element={
          <ProtectedRoute>
            <Files_List />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat_interface"
        element={
          <ProtectedRoute>
            <Chat_Page />
          </ProtectedRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
