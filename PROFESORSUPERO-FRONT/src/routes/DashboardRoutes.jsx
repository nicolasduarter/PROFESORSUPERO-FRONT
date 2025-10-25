import { Routes, Route } from "react-router-dom";
import DashboardEstudiante from "../modules/estudiante/DashboardEstudiante";
import DashboardDecano from "../modules/decanatura/DashboardDecanatura.jsx";

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="estudiante" element={<DashboardEstudiante />} />
            <Route path="decano" element={<DashboardDecano />} />
        </Routes>
    );
}

export default DashboardRoutes;
