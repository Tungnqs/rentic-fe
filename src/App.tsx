import "./assets/css/global.css";
import AppRoutes from "./routes/AppRoutes";
import AppProvider from "./providers/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketContextProvider from "./context/SocketContext";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AppProvider>
        <SocketContextProvider>
          <AppRoutes />
        </SocketContextProvider>
      </AppProvider>
    </>
  );
}

export default App;
