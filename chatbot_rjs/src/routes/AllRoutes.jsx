import { useNavigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import { instance } from "../config/axios_config";
import { useEffect, useState } from "react";
import Files_List from "../pages/Files_List";
import Chat_Page from "../pages/Chat_Page";
import MyProfile from "../pages/MyProfile";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const getAuthStatus = async () => {
    try {
      const res = await instance.get("/authenticated");
      if (res.status >= 500) toast("We will be back soon!");
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
    return (
      <div className="relative h-screen w-screen">
        <div className="flex items-center absolute top-1/2 left-1/2 gap-4 -translate-x-1/2 -translate-y-1/2">
          <p className="text-2xl self-end mt-2">Loading...</p>
          <Spinner />
        </div>
      </div>
    );
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

// const Test = () => {
//   return (
//     <div
//       className="w-screen h-screen"
//       style={{
//         backgroundImage: 'Url("/Hero Section.png")',
//         backgroundRepeat: "none",
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <nav className="w-full m-auto flex gap-2">
//         <h1 className="text-white text-3xl">logo</h1>
//         <ul className="w-full text-white flex text-xl m-auto gap-2">
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//           <li>Hello</li>
//         </ul>
//         <div></div>
//       </nav>
//     </div>
//   );
// };

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/test" element={<Test />} /> */}
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
      <Route
        path="/profile/me"
        element={
          <ProtectedRoute>
            <MyProfile />
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
