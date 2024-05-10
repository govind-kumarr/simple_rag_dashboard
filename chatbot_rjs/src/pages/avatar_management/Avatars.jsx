import React, { useEffect, useState } from "react";
import { lambdas } from "../../config/axios_config";

const Avatars = () => {
  const [avatars, setAvatars] = useState([]);
  const getAllAvatars = async () => {
    try {
      const { data } = await lambdas.get("/avatars");
      setAvatars(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAvatars();
  }, []);
  return (
    <div>
      {/* Headers  */}
      <div>
        {avatars.length > 0 &&
          avatars.map((avatar) => (
            <div key={avatar}>
              <img
                className="w-20"
                src={`https://nr3wrniofl.execute-api.ap-south-1.amazonaws.com/avatars/${avatar}`}
                alt={avatar}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Avatars;
