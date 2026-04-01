import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <div>
        Hello
        <AdminRoutes />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
