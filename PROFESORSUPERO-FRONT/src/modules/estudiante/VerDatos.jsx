"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function VerDatos() {
    const navigate = useNavigate()
    const [estudiante, setEstudiante] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("info")

    const idEstudiante = localStorage.getItem("id")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)

            // Fetch estudiante info
            const estudianteRes = await fetch(`http://localhost:8080/api/estudiantes/${idEstudiante}`)
            const estudianteData = await estudianteRes.json()
            setEstudiante(estudianteData)

            console.log(idEstudiante);
            console.log(estudianteData)

            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        }
    }

    const handleVerDetalles = (item, type) => {
        setSelectedItem({ ...item, type })
        setModalOpen(true)
    }


    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-lg">Cargando información...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/dashboard/estudiante")} className="text-white hover:text-gray-300">
                            ← Volver
                        </button>
                        <h1 className="text-xl font-bold">Información del Estudiante</h1>
                    </div>
                    <nav className="flex gap-6">
                        <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300">
                            Dashboard
                        </button>
                        <button onClick={() => navigate("/dashboard/estudiante/solicitudes")} className="hover:text-gray-300">
                            Solicitudes
                        </button>
                        <button onClick={() => navigate("/login")} className="hover:text-gray-300">
                            Cerrar Sesión
                        </button>
                    </nav>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-gray-100 border-b">
                <div className="max-w-7xl mx-auto flex gap-4 px-4">
                    <button
                        onClick={() => setActiveTab("info")}
                        className={`py-3 px-6 font-medium ${
                            activeTab === "info" ? "border-b-2 border-black text-black" : "text-gray-600 hover:text-black"
                        }`}
                    >
                        Información Personal
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Información Personal */}
                    {activeTab === "info" && estudiante && (
                        <div className="space-y-4">
                            <div className="bg-green-100 p-6 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Nombre</p>
                                        <p className="font-medium">{estudiante.fullName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{estudiante.correo}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Facultad</p>
                                        <p className="font-medium">{estudiante.facultad?.facultadName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Semestre</p>
                                        <p className="font-medium">{estudiante.semestre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white p-4 mt-auto">
                <div className="max-w-7xl mx-auto text-center">
                    <p>© 2025 Sistema de Gestión Académica</p>
                </div>
            </footer>

            {/* Modal */}
            {modalOpen && selectedItem && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold">Detalles</h2>
                            <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                ×
                            </button>
                        </div>

                        {selectedItem.type === "horario" && (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600">Periodo</p>
                                    <p className="font-medium">{selectedItem.periodo}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Año</p>
                                    <p className="font-medium">{selectedItem.anio}</p>
                                </div>
                                {selectedItem.materias && selectedItem.materias.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Materias</p>
                                        <div className="space-y-2">
                                            {selectedItem.materias.map((materia, index) => (
                                                <div key={index} className="bg-gray-50 p-3 rounded">
                                                    <p className="font-medium">{materia.nombre}</p>
                                                    <p className="text-sm text-gray-600">Código: {materia.codigo}</p>
                                                    <p className="text-sm text-gray-600">Créditos: {materia.creditos}</p>
                                                    {materia.profesor && <p className="text-sm text-gray-600">Profesor: {materia.profesor}</p>}
                                                    {materia.horario && <p className="text-sm text-gray-600">Horario: {materia.horario}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setModalOpen(false)}
                            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
