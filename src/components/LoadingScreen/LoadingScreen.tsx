import React from "react";
import Loader from "../Loader/Loader";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-black opacity-80" />
      <div className="z-10">
        <Loader />
      </div>
    </div>
  );
};

export default LoadingScreen;
