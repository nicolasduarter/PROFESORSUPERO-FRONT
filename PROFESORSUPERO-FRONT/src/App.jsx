// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
    return (
        <Routes>
            {/* Rutas de autenticación */}
            <Route path="/*" element={<AuthRoutes />} />

            {/* Rutas del dashboard */}
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
    );
}

export default App;

