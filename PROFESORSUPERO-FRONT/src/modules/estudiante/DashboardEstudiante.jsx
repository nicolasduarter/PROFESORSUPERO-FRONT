import { useState } from "react"
import { useNavigate } from "react-router-dom"

function DashboardDecano() {
    const [stats] = useState({
        pendientes: 12,
        enProceso: 8,
        aprobadas: 24,
        total: 44,
    })

    const [avisos] = useState([
        {
            id: 1,
            title: "Reunión de facultad",
            description: "Reunión de facultad programada para el 15 de marzo",
        },
        {
            id: 2,
            title: "Fecha límite solicitudes",
            description: "Fecha límite solicitudes: 20 de marzo",
        },
    ])

    const [solicitudes, setSolicitudes] = useState([
        {
            id: "#SOL-2025-001",
            nombre: "Juan Carlos Pérez",
            programa: "Ingeniería de Sistemas",
            curso: "Cálculo Diferencial",
            fecha: "10 de marzo, 2025",
            estado: "Pendiente",
            tipo: "Cambio de grupo",
            descripcion:
                "Solicito el cambio de grupo debido a un conflicto de horario con mi trabajo de medio tiempo. El grupo actual tiene clases los martes y jueves en la mañana, y necesito un grupo en la tarde para poder asistir.",
        },
        {
            id: "#SOL-2025-002",
            nombre: "Ana María López",
            programa: "Administración",
            curso: "Estadística",
            fecha: "9 de marzo, 2025",
            estado: "En Proceso",
            tipo: "Cambio de materia",
            descripcion:
                "Deseo cambiar de Estadística Básica a Estadística Avanzada ya que cuento con conocimientos previos certificados y el contenido del curso básico ya lo domino. Adjunto certificación de curso previo.",
        },
        {
            id: "#SOL-2025-003",
            nombre: "Carlos Rodríguez",
            programa: "Psicología",
            curso: "Neuropsicología",
            fecha: "8 de marzo, 2025",
            estado: "Pendiente",
            tipo: "Cancelación",
            descripcion:
                "Por motivos de salud debo cancelar la asignatura de Neuropsicología este semestre. Adjunto certificado médico que justifica mi situación. Planeo retomar la materia el próximo periodo académico.",
        },
        {
            id: "#SOL-2025-004",
            nombre: "Laura Fernández",
            programa: "Derecho",
            curso: "Derecho Civil",
            fecha: "7 de marzo, 2025",
            estado: "Aprobada",
            tipo: "Cambio de grupo",
            descripcion:
                "Solicito cambio de grupo por incompatibilidad de horario con otra asignatura obligatoria de mi programa. El grupo B02 se ajusta mejor a mi carga académica actual.",
        },
    ])

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [modalAbierto, setModalAbierto] = useState(false)
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)

    const navigate = useNavigate()

    const handleAprobar = (id) => {
        setSolicitudes(solicitudes.map((sol) => (sol.id === id ? { ...sol, estado: "Aprobada" } : sol)))
    }

    const handleRechazar = (id) => {
        setSolicitudes(solicitudes.map((sol) => (sol.id === id ? { ...sol, estado: "Rechazada" } : sol)))
    }

    const getBadgeColor = (estado) => {
        switch (estado) {
            case "Pendiente":
                return "bg-yellow-100 text-yellow-800"
            case "En Proceso":
                return "bg-blue-100 text-blue-800"
            case "Aprobada":
                return "bg-green-100 text-green-800"
            case "Rechazada":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getTipoIcon = (tipo) => {
        switch (tipo) {
            case "Cambio de grupo":
                return "🔄"
            case "Cambio de materia":
                return "📚"
            case "Cancelación":
                return "❌"
            default:
                return "📄"
        }
    }

    const handleVerDetalles = (solicitud) => {
        setSolicitudSeleccionada(solicitud)
        setModalAbierto(true)
    }

    const handleCerrarModal = () => {
        setModalAbierto(false)
        setSolicitudSeleccionada(null)
    }

    const handleCerrarSesion = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside
                className={`
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
                fixed md:static
                w-64 bg-white shadow-lg
                h-screen
                transition-transform duration-300 ease-in-out
                z-30
            `}
            >
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white">🎓</div>
                        <span className="font-bold text-gray-800">Portal Académico - Decano</span>
                    </div>

                    <nav className="space-y-2">
                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-2 2h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Solicitudes
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            Reportes
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            Estudiantes
                        </a>
                        <a
                            href="#"
                            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826 3.31 2.37 2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            Configuración
                        </a>
                    </nav>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-500 mb-4">Avisos Importantes</h3>
                        <div className="space-y-3">
                            {avisos.map((aviso) => (
                                <div key={aviso.id} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium text-gray-800">{aviso.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{aviso.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <div className="flex-1 flex flex-col">
                <header className="bg-gray-900 text-white shadow-lg">
                    <div className="px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex justify-between items-center">
                            <button
                                className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <nav className="hidden md:flex items-center gap-6">
                                <a href="#" className="hover:text-green-400 transition-colors">
                                    Dashboard
                                </a>
                                <a href="#" className="hover:text-green-400 transition-colors">
                                    Solicitudes
                                </a>
                                <button
                                    onClick={handleCerrarSesion}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </nav>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, Decano!</h1>
                        <p className="text-gray-600 mt-1">Gestión de solicitudes académicas</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">Pendientes</p>
                                    <p className="text-3xl font-bold">{stats.pendientes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">En Proceso</p>
                                    <p className="text-3xl font-bold">{stats.enProceso}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">Aprobadas</p>
                                    <p className="text-3xl font-bold">{stats.aprobadas}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center gap-4">
                                <div className="bg-white bg-opacity-30 p-3 rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm opacity-90">Total</p>
                                    <p className="text-3xl font-bold">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-900">Solicitudes Recientes</h2>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    Reportes y Estadísticas
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {solicitudes.map((solicitud) => (
                                    <div
                                        key={solicitud.id}
                                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-sm font-mono text-green-700">{solicitud.id}</span>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(solicitud.estado)}`}
                                            >
                        {solicitud.estado}
                      </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{solicitud.nombre}</h3>

                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Programa:</span> {solicitud.programa}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Curso:</span> {solicitud.curso}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Fecha:</span> {solicitud.fecha}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">
                                            {solicitud.estado !== "Aprobada" && solicitud.estado !== "Rechazada" && (
                                                <>
                                                    <button
                                                        onClick={() => handleAprobar(solicitud.id)}
                                                        className="flex-1 bg-white text-green-700 border border-green-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                                                    >
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() => handleRechazar(solicitud.id)}
                                                        className="flex-1 bg-white text-red-700 border border-red-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                                                    >
                                                        Rechazar
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleVerDetalles(solicitud)}
                                                className="flex-1 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                Ver Detalles
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-900 text-white text-center py-4">
                    <p className="text-sm">© 2025 SIRHA - Sistema Integral de Recursos Humanos Académicos</p>
                </footer>
            </div>

            {modalAbierto && solicitudSeleccionada && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-t-xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Detalles de la Solicitud</h2>
                                    <p className="text-green-50 text-sm font-mono">{solicitudSeleccionada.id}</p>
                                </div>
                                <button
                                    onClick={handleCerrarModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Información del Estudiante</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Nombre</p>
                                        <p className="font-semibold text-gray-900">{solicitudSeleccionada.nombre}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Programa</p>
                                        <p className="font-semibold text-gray-900">{solicitudSeleccionada.programa}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Curso</p>
                                        <p className="font-semibold text-gray-900">{solicitudSeleccionada.curso}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Fecha de Solicitud</p>
                                        <p className="font-semibold text-gray-900">{solicitudSeleccionada.fecha}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Tipo de Solicitud</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{getTipoIcon(solicitudSeleccionada.tipo)}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-lg">{solicitudSeleccionada.tipo}</p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${getBadgeColor(solicitudSeleccionada.estado)}`}
                                        >
                      {solicitudSeleccionada.estado}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Descripción / Justificación</h3>
                                <p className="text-gray-700 leading-relaxed">{solicitudSeleccionada.descripcion}</p>
                            </div>

                            {solicitudSeleccionada.estado !== "Aprobada" && solicitudSeleccionada.estado !== "Rechazada" && (
                                <div className="flex gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => {
                                            handleAprobar(solicitudSeleccionada.id)
                                            handleCerrarModal()
                                        }}
                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        ✓ Aprobar Solicitud
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleRechazar(solicitudSeleccionada.id)
                                            handleCerrarModal()
                                        }}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                    >
                                        ✗ Rechazar Solicitud
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={handleCerrarModal}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardDecano




