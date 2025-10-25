"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Componente para ver y gestionar las solicitudes del estudiante
 * Muestra una lista de solicitudes con filtros y búsqueda
 */
function VerSolicitudes() {
    const navigate = useNavigate()

    // Estado para los filtros
    const [busqueda, setBusqueda] = useState("")
    const [filtroEstado, setFiltroEstado] = useState("todos")
    const [filtroTipo, setFiltroTipo] = useState("todos")
    const [paginaActual, setPaginaActual] = useState(1)

    // Datos mock de solicitudes (después se reemplazarán con datos del backend)
    const solicitudesMock = [
        {
            id: 1,
            tipo: "Cambiar grupo de asignatura",
            icono: "🔄",
            estado: "En curso",
            asignatura: "Matemáticas I",
            grupoActual: "A01",
            fecha: "15/09/2025",
            colorEstado: "bg-blue-100 text-blue-800",
        },
        {
            id: 2,
            tipo: "Inscribir asignatura",
            icono: "👤",
            estado: "Aprobada",
            asignatura: "Física II",
            grupoActual: "B02",
            fecha: "12/09/2025",
            colorEstado: "bg-green-100 text-green-800",
        },
        {
            id: 3,
            tipo: "Cancelar asignatura",
            icono: "👤",
            estado: "Rechazada",
            asignatura: "Química I",
            grupoActual: "C01",
            fecha: "10/09/2025",
            colorEstado: "bg-red-100 text-red-800",
        },
        {
            id: 4,
            tipo: "Cambiar grupo de asignatura",
            icono: "🔄",
            estado: "Aprobada",
            asignatura: "Historia I",
            grupoActual: "D01",
            fecha: "08/09/2025",
            colorEstado: "bg-green-100 text-green-800",
        },
        {
            id: 5,
            tipo: "Inscribir asignatura",
            icono: "👤",
            estado: "En curso",
            asignatura: "Inglés II",
            grupoActual: "E01",
            fecha: "05/09/2025",
            colorEstado: "bg-blue-100 text-blue-800",
        },
    ]

    const handleVerDetalles = (solicitudId) => {
        navigate(`/dashboard/estudiante/solicitud/${solicitudId}`)
    }

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value)
    }

    const handleEstadoChange = (e) => {
        setFiltroEstado(e.target.value)
    }

    const handleTipoChange = (e) => {
        setFiltroTipo(e.target.value)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/dashboard/estudiante")} className="text-white hover:text-gray-300">
                            ←
                        </button>
                        <h1 className="text-xl font-bold">SIRHA</h1>
                    </div>
                    <nav className="flex gap-6">
                        <button onClick={() => navigate("/dashboard/estudiante")} className="hover:text-gray-300">
                            Dashboard
                        </button>
                        <button className="hover:text-gray-300">Solicitudes</button>
                        <button className="hover:text-gray-300">Cerrar Sesión</button>
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-8">
                {/* Título */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Ver mis solicitudes</h2>
                    <p className="text-gray-600">Gestiona y revisa el estado de tus solicitudes académicas</p>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="bg-green-200 p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Búsqueda */}
                        <div>
                            <label className="block text-gray-800 text-sm font-semibold mb-2">Buscar solicitud</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-500">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Buscar por tipo o fecha..."
                                    value={busqueda}
                                    onChange={handleBusquedaChange}
                                    className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>

                        {/* Filtro por estado */}
                        <div>
                            <label className="block text-gray-800 text-sm font-semibold mb-2">Filtrar por estado</label>
                            <select
                                value={filtroEstado}
                                onChange={handleEstadoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="todos">Todos los estados</option>
                                <option value="en-curso">En curso</option>
                                <option value="aprobada">Aprobada</option>
                                <option value="rechazada">Rechazada</option>
                                <option value="pendiente">Pendiente</option>
                            </select>
                        </div>

                        {/* Filtro por tipo */}
                        <div>
                            <label className="block text-gray-800 text-sm font-semibold mb-2">Tipo de solicitud</label>
                            <select
                                value={filtroTipo}
                                onChange={handleTipoChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="todos">Todos los tipos</option>
                                <option value="cambiar-grupo">Cambiar grupo</option>
                                <option value="inscribir">Inscribir asignatura</option>
                                <option value="cancelar">Cancelar asignatura</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Lista de solicitudes */}
                <div className="space-y-4">
                    {solicitudesMock.map((solicitud) => (
                        <div key={solicitud.id} className="bg-green-200 p-6 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Ícono */}
                                <div className="text-3xl">{solicitud.icono}</div>

                                {/* Información de la solicitud */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{solicitud.tipo}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${solicitud.colorEstado}`}>
                      {solicitud.estado}
                    </span>
                                    </div>
                                    <div className="flex gap-6 text-sm text-gray-700">
                    <span>
                      <strong>Asignatura:</strong> {solicitud.asignatura}
                    </span>
                                        <span>
                      <strong>Grupo actual:</strong> {solicitud.grupoActual}
                    </span>
                                        <span>
                      <strong>Fecha:</strong> {solicitud.fecha}
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón Ver detalles */}
                            <button
                                onClick={() => handleVerDetalles(solicitud.id)}
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                👁️ Ver detalles
                            </button>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                        onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => setPaginaActual(1)}
                        className={`px-4 py-2 rounded-lg ${
                            paginaActual === 1 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        1
                    </button>
                    <button
                        onClick={() => setPaginaActual(2)}
                        className={`px-4 py-2 rounded-lg ${
                            paginaActual === 2 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => setPaginaActual(3)}
                        className={`px-4 py-2 rounded-lg ${
                            paginaActual === 3 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        3
                    </button>
                    <button
                        onClick={() => setPaginaActual(paginaActual + 1)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                    >
                        →
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-4 mt-12">
                <p className="text-sm">© 2025 SIRHA. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default VerSolicitudes
