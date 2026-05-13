import { useEffect, useState } from "react";
import decanaturaService from "../../services/decanaturaService.js";
import Swal from "sweetalert2";

function SolicitudesDecano() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const cargarSolicitudes = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const facultadId = user?.facultad?.id;
                if (!facultadId) {
                    Swal.fire("Error", "No se encontró la facultad asociada al decano.", "error");
                    return;
                }
                const data = await decanaturaService.obtenerSolicitudesPorFacultad(facultadId);
                setSolicitudes(data);
            } catch (error) {
                console.error("Error cargando solicitudes:", error);
                Swal.fire("Error", "No se pudieron cargar las solicitudes.", "error");
            }
        };

        cargarSolicitudes();
    }, []);

    const solicitudesFiltradas = solicitudes.filter((s) =>
        s.estudianteId?.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Solicitudes de la Facultad</h1>

            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Buscar por ID de estudiante..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-green-400"
                />
                <span className="text-sm text-gray-600">
          Total: <strong>{solicitudesFiltradas.length}</strong>
        </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solicitudesFiltradas.map((sol) => (
                    <div
                        key={sol.id}
                        className="bg-white border border-green-200 rounded-xl shadow p-5 hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-mono text-green-700">{sol.id}</span>
                            <span
                                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                    sol.estado === "PENDIENTE"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : sol.estado === "APROBADA"
                                            ? "bg-green-100 text-green-800"
                                            : sol.estado === "RECHAZADA"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-blue-100 text-blue-800"
                                }`}
                            >
                {sol.estado}
              </span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{sol.nombreEstudiante || "Estudiante"}</h3>
                        <p className="text-sm text-gray-700">Programa: {sol.nombrePrograma || "N/A"}</p>
                        <p className="text-sm text-gray-700">Tipo: {sol.tipoSolicitud}</p>
                        <p className="text-sm text-gray-700 mb-3">Fecha: {sol.fecha}</p>

                        <button
                            onClick={() =>
                                Swal.fire("Detalles", JSON.stringify(sol, null, 2), "info")
                            }
                            className="w-full bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                        >
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SolicitudesDecano;
