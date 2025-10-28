import { Routes, Route } from "react-router-dom"
import DashboardEstudiante from "../modules/estudiante/DashboardEstudiante"
import CrearSolicitud from "../modules/estudiante/CrearSolicitud"
import VerSolicitudes from "../modules/estudiante/VerSolicitudes"
import VerHorario from "../modules/estudiante/VerHorario"
import VerDatos from "../modules/estudiante/VerDatos.jsx"
import DashboardDecano from "../modules/decanatura/DashboardDecanatura.jsx";
import DashboardAdministrador from "../modules/administrador/DashboardAdministrador.jsx";
import AdministrarUsuarios from "../modules/administrador/AdministrarUsuarios.jsx";
import AdministrarAsignaturas from "../modules/administrador/AdministrarAsignaturas.jsx";
import ReportesEstadisticas from "../modules/decanatura/ReportesEstadisticas.jsx";
import AdministrarFechas from "../modules/administrador/AdministrarFechas.jsx";
import VerSolicitudesAdmin from "../modules/administrador/VerSolicitudesAdmin.jsx";
import AdministrarMaterias from "../modules/administrador/AdministrarMaterias.jsx";
import AdministrarGrupos from "../modules/administrador/AdministrarGrupos.jsx";
import SolicitudesDecano from "../modules/decanatura/SolicitudesDecano.jsx";

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/estudiante" element={<DashboardEstudiante />} />
            <Route path="/estudiante/crear-solicitud" element={<CrearSolicitud />} />
            <Route path="/estudiante/solicitudes" element={<VerSolicitudes />} />
            <Route path="/estudiante/horario" element={<VerHorario />} />
                <Route path="/estudiante/datos" element={<VerDatos />} />
            <Route path="decano" element={<DashboardDecano />} />
            <Route path="decano/reportes" element={<ReportesEstadisticas />} />
            <Route path="/administrador" element={<DashboardAdministrador />} />
            <Route path="/admin/usuarios" element={<AdministrarUsuarios />} />
            <Route path="/admin/asignaturas" element={<AdministrarAsignaturas />} />
            <Route path="/admin/fechas" element={<AdministrarFechas />} />
            <Route path="/admin/solicitudes" element={<VerSolicitudesAdmin />} />
            <Route path="/admin/materias" element={<AdministrarMaterias />} />
            <Route path="/admin/grupos" element={<AdministrarGrupos />} />
            <Route path="/decano/solicitudes" element={<SolicitudesDecano />} />
        </Routes>
    );
}

export default DashboardRoutes;
