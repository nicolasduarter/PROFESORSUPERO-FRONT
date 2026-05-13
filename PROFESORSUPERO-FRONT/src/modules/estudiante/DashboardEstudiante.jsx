"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function DashboardEstudiante() {
    const navigate = useNavigate()

    const [studentData] = useState({
        name: "estudiante",
        creditos: 18,
        solicitudesSemestre: 5,
        pendientes: 2,
    })

    const [notices] = useState([
        {
            id: 1,
            title: "Período de inscripciones",
            content: "Las inscripciones para el próximo semestre inician el 15 de enero.",
            time: "Hace 2 días",
        },
        {
            id: 2,
            title: "Mantenimiento del sistema",
            content: "El sistema estará en mantenimiento el domingo de 2:00 AM a 6:00 AM.",
            time: "Hace 1 semana",
        },
        {
            id: 3,
            title: "Nueva funcionalidad",
            content: "Ya puedes consultar tu progreso académico en tiempo real.",
            time: "Hace 2 semanas",
        },
    ])

    return (
        <div className="min-h-screen bg-white">
            {/* Header/Navbar */}
            <nav className="bg-black text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo y título */}
                        <div className="flex items-center space-x-3">
                            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold">SIRHA</span>
                        </div>

                        {/* Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#" className="hover:text-gray-300 transition-colors">
                                Solicitudes
                            </a>
                            <a href="/" className="hover:text-gray-300 transition-colors">
                                Cerrar Sesión
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, {studentData.name}!</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Actions - 2/3 width */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Nueva Solicitud Card */}
                        <button
                            onClick={() => navigate("/dashboard/estudiante/crear-solicitud")}
                            className="bg-green-400 hover:bg-green-500 rounded-xl shadow-lg p-8 transition-all transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-4 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">Nueva Solicitud</span>
                            </div>
                        </button>

                        {/* Ver Mis Solicitudes Card */}
                        <button
                            onClick={() => navigate("/dashboard/estudiante/solicitudes")}
                            className="bg-green-400 hover:bg-green-500 rounded-xl shadow-lg p-8 transition-all transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-4 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">Ver Mis Solicitudes</span>
                            </div>
                        </button>

                        {/* Ver Horario Card */}
                        <button
                            onClick={() => navigate("/dashboard/estudiante/horario")}
                            className="bg-green-400 hover:bg-green-500 rounded-xl shadow-lg p-8 transition-all transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-4 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">Ver Horario</span>
                            </div>
                        </button>

                        {/* Ver datos */}
                        <button
                            onClick={() => navigate("/dashboard/estudiante/datos")}
                            className="bg-green-400 hover:bg-green-500 rounded-xl shadow-lg p-8 transition-all transform hover:scale-105"
                        >
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-4 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">Ver Datos del Estudiante</span>
                            </div>
                        </button>


                        {/* Ver Semáforo Card */}
                        <div className="bg-green-400 hover:bg-green-500 rounded-xl shadow-lg p-8 transition-all transform hover:scale-105 cursor-pointer">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="bg-white p-4 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V5a2 2 0 002-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold text-gray-900">Ver Semáforo</span>
                            </div>
                        </div>
                    </div>

                    {/* Avisos/Noticias Sidebar - 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Avisos/Noticias</h2>
                            <div className="space-y-4">
                                {notices.map((notice) => (
                                    <div key={notice.id} className="border-b border-gray-200 pb-4 last:border-0">
                                        <h3 className="font-semibold text-gray-900 mb-1">{notice.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{notice.content}</p>
                                        <span className="text-xs text-gray-400">{notice.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-8 bg-black rounded-xl shadow-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
                        <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            <div>
                                <span className="text-sm text-gray-400">Créditos inscritos: </span>
                                <span className="font-bold">{studentData.creditos}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <div>
                                <span className="text-sm text-gray-400">Solicitudes este semestre: </span>
                                <span className="font-bold">{studentData.solicitudesSemestre}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <div>
                                <span className="text-sm text-gray-400">Pendientes: </span>
                                <span className="font-bold">{studentData.pendientes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardEstudiante



