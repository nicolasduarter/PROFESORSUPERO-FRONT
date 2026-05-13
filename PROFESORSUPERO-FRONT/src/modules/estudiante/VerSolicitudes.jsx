"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function VerSolicitudes() {
    const navigate = useNavigate()
    const [solicitudes, setSolicitudes] = useState([])
    const [materiasMap, setMateriasMap] = useState({})
    const [detalleSeleccionado, setDetalleSeleccionado] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // ID del estudiante (temporal)
    const estudianteId = localStorage.getItem("id")

    console.log(estudianteId)

    useEffect(() => {
        const fetchSolicitudesYMaterias = async () => {
            try {
                // 1) traer solicitudes del estudiante
                const resSolicitudes = await axios.get(
                    `http://localhost:8080/api/estudiantes/${estudianteId}/solicitudes`
                )
                const sols = resSolicitudes.data || []
                setSolicitudes(sols)

                // 2) extraer ids únicos de materias de las solicitudes
                const idsSet = new Set()
                sols.forEach((s) => {
                    if (s.materiaProblemaId) idsSet.add(s.materiaProblemaId)
                    if (s.materiaCambioId) idsSet.add(s.materiaCambioId)
                })
                const ids = Array.from(idsSet)

                if (ids.length === 0) {
                    setMateriasMap({})
                    return
                }

                // 3) por cada id, pedir /materias/id/{id} (observa que el controller usa /materias)
                // usamos Promise.all para ejecutarlas en paralelo
                const materiasResponses = await Promise.all(
                    ids.map((id) =>
                        axios
                            .get(`http://localhost:8080/materias/id/${encodeURIComponent(id)}`)
                            .then((r) => ({ id, data: r.data }))
                            .catch((err) => {
                                console.error("No se pudo obtener materia", id, err)
                                return { id, data: null }
                            })
                    )
                )

                // 4) construir el mapa id -> nombre (con fallback al id si no hay nombre)
                const map = {}
                materiasResponses.forEach((mr) => {
                    const d = mr.data
                    if (d) {
                        // intenta varios nombres comunes por si la API cambia la forma del DTO
                        map[mr.id] = d.nombre || d.name || d.nombreMateria || mr.id
                    } else {
                        map[mr.id] = mr.id // fallback: si no existe, dejamos el id
                    }
                })

                setMateriasMap(map)
            } catch (err) {
                console.error("❌ Error cargando solicitudes o materias:", err)
                setError("No se pudieron cargar las solicitudes o las materias.")
            } finally {
                setLoading(false)
            }
        }

        fetchSolicitudesYMaterias()
    }, [])

    const handleVerDetalles = (solicitud) => {
        setDetalleSeleccionado(solicitud)
    }
    const cerrarModal = () => setDetalleSeleccionado(null)

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-gray-700">Cargando solicitudes...</p>
            </div>
        )

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        )

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="container mx-auto flex items-center justify-between">
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
                        <button onClick={() => navigate("/dashboard/estudiante")} className="hover:text-gray-300">Dashboard</button>
                        <button className="hover:text-gray-300">Solicitudes</button>
                        <button onClick={() => navigate("/")} className="hover:text-gray-300">Cerrar Sesión</button>
                    </nav>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Mis Solicitudes</h2>
                    <p className="text-gray-600">Revisa el estado de tus solicitudes académicas</p>
                </div>

                {solicitudes.length === 0 ? (
                    <p className="text-gray-700">No tienes solicitudes registradas aún.</p>
                ) : (
                    <div className="space-y-4">
                        {solicitudes.map((solicitud) => (
                            <div
                                key={solicitud.id}
                                className="bg-green-100 p-6 rounded-lg flex items-center justify-between hover:shadow-md transition-shadow"
                            >
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {solicitud.tipoSolicitud?.replace("_", " ") || solicitud.tipoSolicitud}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        <strong>Materia:</strong>{" "}
                                        {materiasMap[solicitud.materiaProblemaId] || solicitud.materiaProblemaId}
                                    </p>

                                    {solicitud.materiaCambioId && (
                                        <p className="text-sm text-gray-700">
                                            <strong>Materia nueva:</strong>{" "}
                                            {materiasMap[solicitud.materiaCambioId] || solicitud.materiaCambioId}
                                        </p>
                                    )}

                                    <p className="text-sm text-gray-700"><strong>Grupo:</strong> {solicitud.grupoId}</p>
                                    <p className="text-sm text-gray-700"><strong>Estado:</strong> {solicitud.estado}</p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Fecha:</strong> {new Date(solicitud.fecha).toLocaleDateString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleVerDetalles(solicitud)}
                                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    👁️ Ver detalles
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal de detalles */}
            {detalleSeleccionado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
                        <button onClick={cerrarModal} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">✖</button>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">Detalles de la solicitud</h3>

                        <p><strong>Tipo:</strong> {detalleSeleccionado.tipoSolicitud?.replace("_", " ")}</p>
                        <p>
                            <strong>Materia principal:</strong>{" "}
                            {materiasMap[detalleSeleccionado.materiaProblemaId] || detalleSeleccionado.materiaProblemaId}
                        </p>
                        {detalleSeleccionado.materiaCambioId && (
                            <p>
                                <strong>Materia nueva:</strong>{" "}
                                {materiasMap[detalleSeleccionado.materiaCambioId] || detalleSeleccionado.materiaCambioId}
                            </p>
                        )}
                        <p><strong>Grupo actual:</strong> {detalleSeleccionado.grupoId}</p>
                        {detalleSeleccionado.grupoCambioId && (<p><strong>Nuevo grupo:</strong> {detalleSeleccionado.grupoCambioId}</p>)}
                        <p><strong>Estado:</strong> {detalleSeleccionado.estado}</p>
                        <p><strong>Fecha:</strong> {new Date(detalleSeleccionado.fecha).toLocaleDateString()}</p>
                    </div>
                </div>
            )}

            <footer className="bg-black text-white text-center py-4 mt-12">
                <p className="text-sm">© 2025 SIRHA. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default VerSolicitudes

