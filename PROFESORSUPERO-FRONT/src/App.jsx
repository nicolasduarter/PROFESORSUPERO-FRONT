// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import SolicitudesDecano from "./modules/decanatura/SolicitudesDecano.jsx";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<AuthRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            <Route path="/decanatura/solicitudes" element={<SolicitudesDecano />} />
        </Routes>
    );
}

export default App;

