import React, { useEffect } from "react";
import "./assets/css/global.css";
import AppRoutes from "./routes/AppRoutes";
import AppProvider from "./providers/AppProvider";


function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
