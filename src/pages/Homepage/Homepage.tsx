import React from "react";
import { getCookie } from "../../utils/cookies.utils";
import { Navigate } from "react-router";

const Homepage = () => {
  const token = getCookie("token");
    console.log("token", token);
    
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return <div>Homepage</div>;
};

export default Homepage;
