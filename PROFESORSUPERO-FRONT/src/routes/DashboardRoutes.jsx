import { Routes, Route } from "react-router-dom"
import DashboardEstudiante from "../modules/estudiante/DashboardEstudiante"
import CrearSolicitud from "../modules/estudiante/CrearSolicitud"
import VerSolicitudes from "../modules/estudiante/VerSolicitudes"
import VerHorario from "../modules/estudiante/VerHorario"

function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/estudiante" element={<DashboardEstudiante />} />
            <Route path="/estudiante/crear-solicitud" element={<CrearSolicitud />} />
            <Route path="/estudiante/solicitudes" element={<VerSolicitudes />} />
            <Route path="/estudiante/horario" element={<VerHorario />} />
        </Routes>
    )
}

export default DashboardRoutes


