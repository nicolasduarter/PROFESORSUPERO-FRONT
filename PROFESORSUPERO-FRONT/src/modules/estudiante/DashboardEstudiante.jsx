import { useState } from 'react';

function DashboardEstudiante() {
    const [studentData] = useState({
        name: 'estudiante',
        creditos: 18,
        solicitudesSemestre: 5,
        pendientes: 2
    });

    const [notices] = useState([
        {
            id: 1,
            title: 'Período de inscripciones',
            content: 'Las inscripciones para el próximo semestre inician el 15 de enero.',
            time: 'Hace 2 días'
        },
        {
            id: 2,
            title: 'Mantenimiento del sistema',
            content: 'El sistema estará en mantenimiento el domingo de 2:00 AM a 6:00 AM.',
            time: 'Hace 1 semana'
        },
        {
            id: 3,
            title: 'Nueva funcionalidad',
            content: 'Ya puedes consultar tu progreso académico en tiempo real.',
            time: 'Hace 2 semanas'
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header/Navbar */}
            <header className="bg-gray-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo y título */}
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="bg-green-500 p-2 rounded-lg">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">SIRHA</span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#" className="hover:text-green-400 transition-colors">Solicitudes</a>
                            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                                Cerrar Sesión
                            </button>
                        </nav>

                        {/* Mobile menu button */}
                        <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ¡Bienvenido, {studentData.name}!
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Actions - 2/3 width */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nueva Solicitud Card */}
                            <button className="bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-white bg-opacity-30 p-4 rounded-full">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold">Nueva Solicitud</span>
                                </div>
                            </button>

                            {/* Ver Mis Solicitudes Card */}
                            <button className="bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-white bg-opacity-30 p-4 rounded-full">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold">Ver Mis Solicitudes</span>
                                </div>
                            </button>

                            {/* Ver Horario Card */}
                            <button className="bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-white bg-opacity-30 p-4 rounded-full">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold">Ver Horario</span>
                                </div>
                            </button>

                            {/* Ver Semáforo Card */}
                            <button className="bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="bg-white bg-opacity-30 p-4 rounded-full">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-semibold">Ver Semáforo</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Avisos/Noticias Sidebar - 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Avisos/Noticias</h2>
                            <div className="space-y-4">
                                {notices.map((notice) => (
                                    <div key={notice.id} className="border-l-4 border-green-500 pl-4 py-3 hover:bg-gray-50 transition-colors rounded-r">
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
                <div className="mt-8 bg-gray-900 text-white rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <div>
                                <span className="text-gray-400 text-sm">Créditos inscritos: </span>
                                <span className="font-bold text-lg">{studentData.creditos}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                                <span className="text-gray-400 text-sm">Solicitudes este semestre: </span>
                                <span className="font-bold text-lg">{studentData.solicitudesSemestre}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <span className="text-gray-400 text-sm">Pendientes: </span>
                                <span className="font-bold text-lg">{studentData.pendientes}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DashboardEstudiante;