import { Routes, Route } from "react-router-dom"
import DashboardEstudiante from "../modules/estudiante/DashboardEstudiante"
import CrearSolicitud from "../modules/estudiante/CrearSolicitud"
import VerSolicitudes from "../modules/estudiante/VerSolicitudes"
import VerHorario from "../modules/estudiante/VerHorario"
import DashboardDecano from "../modules/decanatura/DashboardDecanatura.jsx";
import DashboardAdministrador from "../modules/administrador/DashboardAdministrador.jsx";
import AdministrarUsuarios from "../modules/administrador/AdministrarUsuarios.jsx";

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/estudiante" element={<DashboardEstudiante />} />
            <Route path="/estudiante/crear-solicitud" element={<CrearSolicitud />} />
            <Route path="/estudiante/solicitudes" element={<VerSolicitudes />} />
            <Route path="/estudiante/horario" element={<VerHorario />} />
            <Route path="decano" element={<DashboardDecano />} />
            <Route path="/administrador" element={<DashboardAdministrador />} />
            <Route path="/admin/usuarios" element={<AdministrarUsuarios />} />
        </Routes>
    );
}

export default DashboardRoutes;
