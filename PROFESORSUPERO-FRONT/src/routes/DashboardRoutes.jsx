import { Routes, Route } from "react-router-dom";
import DashboardEstudiante from "../modules/estudiante/DashboardEstudiante";

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="estudiante" element={<DashboardEstudiante />} />
        </Routes>
    );
}

export default DashboardRoutes;
