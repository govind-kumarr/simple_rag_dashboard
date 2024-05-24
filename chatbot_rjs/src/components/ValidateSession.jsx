import React from "react";
import { Navigate } from "react-router-dom";
import { instance } from "../config/axios_config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const ValidateSession = ({ children }) => {
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
  return <>{isAuth ? <Navigate to={"/"} replace={true} /> : children}</>;
};

export default ValidateSession;
