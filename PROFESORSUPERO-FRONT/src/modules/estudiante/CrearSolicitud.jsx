"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"

/**
 * Componente para crear una nueva solicitud de cambio de horario
 * Permite al estudiante solicitar cambios de materia/grupo
 */
function CrearSolicitud() {
    const navigate = useNavigate()

    // Estado del formulario
    const [formData, setFormData] = useState({
        tipoSolicitud: "",
        asignatura: "",
        grupo: "",
        motivo: "",
    })

    // Opciones para el tipo de solicitud
    const tiposSolicitud = [
        { value: "", label: "Ingrese el tipo de solicitud" },
        { value: "cambio_grupo", label: "Cambio de Grupo" },
        { value: "cambio_materia", label: "Cambio de Materia" },
        { value: "cancelacion", label: "Cancelación de Materia" },
    ]

    /**
     * Maneja los cambios en los campos del formulario
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    /**
     * Maneja el envío del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        // TODO: Conectar con el backend
        console.log("Datos de la solicitud:", formData)
        alert("Solicitud enviada exitosamente (mock)")
        navigate("/dashboard/estudiante")
    }

    /**
     * Cancela la creación y vuelve al dashboard
     */
    const handleCancel = () => {
        navigate("/dashboard/estudiante")
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header/Navbar */}
            <nav className="bg-black text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo y botón volver */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/dashboard/estudiante")}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Volver"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>

                            <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold">SIRHA</span>
                            </div>
                        </div>

                        {/* Navigation - Desktop */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button
                                onClick={() => navigate("/dashboard/estudiante")}
                                className="hover:text-green-400 transition-colors"
                            >
                                Dashboard
                            </button>
                            <button className="hover:text-green-400 transition-colors">Solicitudes</button>
                            <button onClick={() => navigate("/")} className="hover:text-green-400 transition-colors">
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-2xl bg-green-400 rounded-2xl shadow-2xl p-8 sm:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Nueva Solicitud</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tipo de Solicitud */}
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

                        {/* Asignatura */}
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Asignatura</label>
                            <Input
                                type="text"
                                name="asignatura"
                                value={formData.asignatura}
                                onChange={handleChange}
                                placeholder="Ingrese la asignatura"
                                className="w-full bg-white"
                            />
                        </div>

                        {/* Grupo */}
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Grupo</label>
                            <Input
                                type="text"
                                name="grupo"
                                value={formData.grupo}
                                onChange={handleChange}
                                placeholder="Ingrese el grupo"
                                className="w-full bg-white"
                            />
                        </div>

                        {/* Motivo */}
                        <div>
                            <label className="block text-gray-900 font-medium mb-2">Motivo</label>
                            <textarea
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                placeholder="Describa detalladamente el motivo de la solicitud"
                                rows="5"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Enviar Solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-4">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-sm">© 2025 SIRHA. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    )
}

export default CrearSolicitud


