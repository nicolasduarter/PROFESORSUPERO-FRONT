"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"; // usa tu configuración axios

function VerHorario() {
    const navigate = useNavigate();
    const [vistaActual, setVistaActual] = useState("calendario");
    const [semanaActual, setSemanaActual] = useState(0);
    const [filtros, setFiltros] = useState({
        mostrarProfesores: true,
        horariosAMPM: true,
        mostrarTodas: true,
        soloObligatorias: false,
    });

    const [horario, setHorario] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🕓 Formatea "HH:mm:ss" → "hh:mm AM/PM"
    const formatearHora = (horaStr) => {
        if (!horaStr) return "";
        const [h, m] = horaStr.split(":").map(Number);
        const date = new Date();
        date.setHours(h, m);
        return date.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Días del backend → español
    const diasMap = {
        MONDAY: "lunes",
        TUESDAY: "martes",
        WEDNESDAY: "miércoles",
        THURSDAY: "jueves",
        FRIDAY: "viernes",
        SATURDAY: "sábado",
        SUNDAY: "domingo",
    };

    const diasSemana = [
        { nombre: "Lunes", key: "lunes" },
        { nombre: "Martes", key: "martes" },
        { nombre: "Miércoles", key: "miércoles" },
        { nombre: "Jueves", key: "jueves" },
        { nombre: "Viernes", key: "viernes" },
        { nombre: "Sábado", key: "sábado" },
        { nombre: "Domingo", key: "domingo" },
    ];

    const horariosBase = [
        "8:00 AM",
        "10:00 AM",
        "12:00 PM",
        "2:00 PM",
        "4:00 PM",
    ];

    const toggleFiltro = (filtro) => {
        setFiltros((prev) => ({ ...prev, [filtro]: !prev[filtro] }));
    };

    const cambiarSemana = (direccion) => {
        setSemanaActual((prev) => prev + direccion);
    };

    // 🧠 Obtener id estudiante desde localStorage o nombre
    const obtenerIdEstudiante = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user?.id) return user.id;

            if (user?.usuario) {
                const res = await api.get(`/api/estudiantes/nombre/${user.usuario}`);
                return res.data?.id;
            }
        } catch {
            return null;
        }
    };

    // 📅 Cargar horario
    const fetchHorario = async () => {
        try {
            setLoading(true);
            const id = await obtenerIdEstudiante();
            if (!id) {
                setError("No se pudo obtener el ID del estudiante. Inicia sesión nuevamente.");
                return;
            }

            const res = await api.get(`/api/estudiantes/${id}/horario/actual`);
            const data = res.data;

            if (!data || !data.grupos || data.grupos.length === 0) {
                console.warn("El estudiante no tiene horario asignado.");
                setHorario({});
                return;
            }

            // Agrupar clases por día
            const horarioPorDia = {
                lunes: [],
                martes: [],
                miércoles: [],
                jueves: [],
                viernes: [],
                sábado: [],
                domingo: [],
            };

            data.grupos.forEach((grupo) => {
                grupo.clases?.forEach((clase) => {
                    const dia = diasMap[clase.diaSemana] || "lunes";
                    horarioPorDia[dia].push({
                        materia: grupo.materia?.nombre || "Sin nombre",
                        hora: `${formatearHora(clase.horaInicio)} - ${formatearHora(clase.horaFin)}`,
                        profesor: grupo.profesor?.fullName || "Sin asignar",
                        tipo: "obligatoria",
                    });
                });
            });

            setHorario(horarioPorDia);
        } catch (err) {
            console.error("Error al cargar horario:", err);
            setError("Error al obtener el horario del servidor.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHorario();
    }, []);

    // 🧩 Buscar clase para cada celda del calendario
    const obtenerClase = (dia, horaTabla) => {
        const clases = horario[dia.toLowerCase()] || [];
        const clasesFiltradas = filtros.soloObligatorias
            ? clases.filter((c) => c.tipo === "obligatoria")
            : clases;

        // Coincidencia flexible por rango horario (detecta 8:00 dentro de "08:00 a. m.")
        return clasesFiltradas.find((clase) => {
            const horaInicio = clase.hora.split("-")[0].trim().toLowerCase();
            return horaInicio.includes(horaTabla.split(" ")[0]);
        });
    };

    // --- RENDER ---
    if (loading) {
        return <div className="p-8 text-gray-700">Cargando horario...</div>;
    }

    if (error) {
        return (
            <div className="p-8 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/dashboard/estudiante")}
                        className="text-white hover:text-gray-300"
                    >
                        ←
                    </button>
                    <h1 className="text-xl font-bold">SIRHA</h1>
                </div>
                <nav className="flex gap-6">
                    <button
                        onClick={() => navigate("/dashboard/estudiante")}
                        className="hover:text-gray-300"
                    >
                        Dashboard
                    </button>
                    <button
                        onClick={() =>
                            navigate("/dashboard/estudiante/solicitudes")
                        }
                        className="hover:text-gray-300"
                    >
                        Solicitudes
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="hover:text-gray-300"
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </header>

            {/* Contenido principal */}
            <main className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Mi Horario de Clases
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setVistaActual("calendario")}
                            className={`px-4 py-2 rounded ${
                                vistaActual === "calendario"
                                    ? "bg-gray-200 text-gray-900"
                                    : "bg-white text-gray-600 border"
                            }`}
                        >
                            📅 Vista de calendario
                        </button>
                        <button
                            onClick={() => setVistaActual("lista")}
                            className={`px-4 py-2 rounded ${
                                vistaActual === "lista"
                                    ? "bg-gray-200 text-gray-900"
                                    : "bg-white text-gray-600 border"
                            }`}
                        >
                            📋 Lista
                        </button>
                        <button
                            onClick={fetchHorario}
                            className="px-4 py-2 bg-white text-gray-600 border rounded hover:bg-gray-50"
                        >
                            🔄 Actualizar Calendario
                        </button>
                    </div>
                </div>

                {/* Vista de calendario */}
                {vistaActual === "calendario" && (
                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-sm font-semibold text-gray-700">
                                    Hora
                                </th>
                                {diasSemana.map((dia) => (
                                    <th
                                        key={dia.key}
                                        className="border p-2 text-sm font-semibold text-gray-700"
                                    >
                                        {dia.nombre}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {horariosBase.map((hora) => (
                                <tr key={hora}>
                                    <td className="border p-2 text-sm font-semibold text-gray-700 bg-gray-50">
                                        {hora}
                                    </td>
                                    {diasSemana.map((dia) => {
                                        const clase = obtenerClase(
                                            dia.key,
                                            hora
                                        );
                                        return (
                                            <td
                                                key={dia.key}
                                                className="border p-3 bg-white"
                                            >
                                                {clase ? (
                                                    <div className="text-sm">
                                                        <div className="font-semibold text-gray-900">
                                                            {clase.materia}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            {clase.hora}
                                                        </div>
                                                        {filtros.mostrarProfesores && (
                                                            <div className="text-xs text-gray-500">
                                                                {
                                                                    clase.profesor
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Vista lista */}
                {vistaActual === "lista" && (
                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                        {Object.entries(horario).map(([dia, clases]) => {
                            if (!clases.length) return null;
                            return (
                                <div
                                    key={dia}
                                    className="bg-white p-4 rounded-lg mb-3"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2 capitalize">
                                        {dia}
                                    </h3>
                                    {clases.map((clase, index) => (
                                        <div
                                            key={index}
                                            className="border-l-4 border-green-500 pl-3 mb-2"
                                        >
                                            <div className="font-semibold text-gray-900">
                                                {clase.materia}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {clase.hora}
                                            </div>
                                            {filtros.mostrarProfesores && (
                                                <div className="text-xs text-gray-500">
                                                    {clase.profesor}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

export default VerHorario;


