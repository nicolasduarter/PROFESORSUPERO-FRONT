"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"
import api from "../../services/api" // asegúrate de tener api.js con axios configurado

function CrearSolicitud() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        tipoSolicitud: "",
        asignatura: "",
        materiaNueva: "",
        grupoActual: "",
        grupoNuevo: "",
        motivo: "",
    })

    const tiposSolicitud = [
        { value: "", label: "Ingrese el tipo de solicitud" },
        { value: "cambio_grupo", label: "Cambio de Grupo" },
        { value: "cambio_materia", label: "Cambio de Materia" },
        { value: "cancelacion", label: "Cancelación de Materia" },
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const estudianteId = "68ffdf636312610a6665f3ee" // temporal mientras no usamos sesión

        try {
            let payload = {}
            let endpoint = ""

            if (formData.tipoSolicitud === "cambio_grupo") {
                endpoint = "/api/solicitudes/cambio-grupo"
                payload = {
                    motivo: formData.motivo,
                    fecha: new Date().toISOString().split("T")[0],
                    prioridad: 1,
                    infoAdicionalEstudiante: "",
                    estudianteId,
                    materiaProblemaId: formData.asignatura,
                    grupoId: formData.grupoActual,
                    grupoCambioId: formData.grupoNuevo,
                }
            } else if (formData.tipoSolicitud === "cambio_materia") {
                endpoint = "/api/solicitudes/cambio-materia"
                payload = {
                    motivo: formData.motivo,
                    fecha: new Date().toISOString().split("T")[0],
                    prioridad: 1,
                    infoAdicionalEstudiante: "",
                    estudianteId,
                    materiaProblemaId: formData.asignatura,
                    materiaCambioId: formData.materiaNueva,
                    grupoId: formData.grupoActual,
                    grupoCambioId: formData.grupoNuevo,
                }
            } else {
                alert("Tipo de solicitud no válido o no implementado aún.")
                return
            }

            const response = await api.post(endpoint, payload)
            console.log("✅ Solicitud creada:", response.data)
            alert("Solicitud enviada exitosamente ✅")
            navigate("/dashboard/estudiante")
        } catch (error) {
            console.error("❌ Error al crear solicitud:", error)
            alert("Error al enviar la solicitud ❌. Revisa la consola.")
        }
    }

    const handleCancel = () => navigate("/dashboard/estudiante")

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <nav className="bg-black text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/dashboard/estudiante")}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <span className="text-xl font-bold">SIRHA</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-6">
                            <button onClick={() => navigate("/dashboard/estudiante")} className="hover:text-green-400">
                                Dashboard
                            </button>
                            <button className="hover:text-green-400">Solicitudes</button>
                            <button onClick={() => navigate("/")} className="hover:text-green-400">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl bg-green-400 rounded-2xl shadow-2xl p-8 sm:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Nueva Solicitud</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Tipo de Solicitud</label>
                            <Select
                                options={tiposSolicitud}
                                value={formData.tipoSolicitud}
                                onChange={handleChange}
                                name="tipoSolicitud"
                                className="w-full bg-white"
                            />
                        </div>

                        {formData.tipoSolicitud === "cambio_grupo" && (
                            <>
                                <Input name="asignatura" placeholder="ID de la materia" onChange={handleChange} className="bg-white" />
                                <Input name="grupoActual" placeholder="ID del grupo actual" onChange={handleChange} className="bg-white" />
                                <Input name="grupoNuevo" placeholder="ID del grupo nuevo" onChange={handleChange} className="bg-white" />
                            </>
                        )}

                        {formData.tipoSolicitud === "cambio_materia" && (
                            <>
                                <Input name="asignatura" placeholder="ID de la materia actual" onChange={handleChange} className="bg-white" />
                                <Input name="materiaNueva" placeholder="ID de la nueva materia" onChange={handleChange} className="bg-white" />
                                <Input name="grupoActual" placeholder="ID del grupo actual" onChange={handleChange} className="bg-white" />
                                <Input name="grupoNuevo" placeholder="ID del grupo nuevo" onChange={handleChange} className="bg-white" />
                            </>
                        )}

                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Motivo</label>
                            <textarea
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                placeholder="Describa detalladamente el motivo"
                                rows="5"
                                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline bg-white"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button type="button" onClick={handleCancel} className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100">
                                Cancelar
                            </button>
                            <button type="submit" className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100">
                                Enviar Solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="bg-black text-white py-4 text-center">
                <p className="text-sm">© 2025 SIRHA. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}

export default CrearSolicitud


