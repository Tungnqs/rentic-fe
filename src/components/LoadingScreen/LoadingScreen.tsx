import React from "react";

import Loader from "../Loader/Loader";



interface LoadingScreenProps {

  text?: string;

}



const LoadingScreen = ({ text }: LoadingScreenProps) => {

  return (

    <div className="fixed inset-0 z-50">

      {/* Backdrop */}

      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />

      

      {/* Loader Container */}

      <div className="relative flex items-center justify-center min-h-screen p-4">

        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">

          <Loader text={text} />

        </div>

      </div>

    </div>

  );

};



export default LoadingScreen;


