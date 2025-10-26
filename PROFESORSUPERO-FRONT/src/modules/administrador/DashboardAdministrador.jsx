import { useState } from 'react';
import { FaCalendarAlt, FaBook, FaCalendarCheck, FaUsers, FaClipboardList, FaFileAlt } from 'react-icons/fa';

function DashboardAdministrador() {
    const [adminData] = useState({
        name: 'Administrador',
        totalSolicitudes: 45,
        pendientes: 12,
        aprobadas: 28
    });

    const [notices] = useState([
        {
            id: 1,
            title: 'Período de cambios activo',
            content: 'El período de cambios de horario finaliza el 30 de enero.',
            time: 'Hace 1 día'
        },
        {
            id: 2,
            title: 'Actualización del sistema',
            content: 'Se han agregado nuevas funcionalidades de reportes.',
            time: 'Hace 3 días'
        },
        {
            id: 3,
            title: 'Recordatorio',
            content: 'Revisar solicitudes pendientes antes del viernes.',
            time: 'Hace 1 semana'
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-gray-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <div className="bg-green-500 p-2 rounded-lg">
                                    <span className="text-2xl">⏰</span>
                                </div>
                                <span className="ml-3 text-xl font-bold">SIRHA</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <a href="/dashboard/administrador" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                                Dashboard
                            </a>
                            <a href="#" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                                Solicitudes
                            </a>
                            <button className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                                Cerrar Sesión
                            </button>
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        ¡Bienvenido, {adminData.name}!
                    </h1>
                    <p className="text-gray-600 mt-2">Gestiona el sistema SIRHA desde tu panel de control</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-green-400 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <FaBook className="text-gray-800 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Gestión Académica</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a href="/admin/horario">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaCalendarAlt className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Administrar Horario</h3>
                                            <p className="text-sm text-gray-600">Gestionar horarios académicos</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/admin/asignatura">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaBook className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Administrar Asignatura</h3>
                                            <p className="text-sm text-gray-600">Gestionar asignaturas</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/admin/fechas">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaCalendarCheck className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Administrar Fechas</h3>
                                            <p className="text-sm text-gray-600">Gestionar fechas importantes</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-green-400 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <FaUsers className="text-gray-800 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Gestión de Usuarios</h2>
                            </div>
                            <div className="grid grid-cols-1">
                                <a href="/dashboard/admin/usuarios">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaUsers className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Administrar Usuarios</h3>
                                            <p className="text-sm text-gray-600">Gestionar cuentas de usuarios del sistema</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="bg-green-400 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <FaClipboardList className="text-gray-800 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Gestión de Solicitudes</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a href="/admin/solicitudes">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaClipboardList className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Ver Todas Las Solicitudes</h3>
                                            <p className="text-sm text-gray-600">Revisar todas las solicitudes</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/admin/registro">
                                    <div className="bg-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="bg-gray-400 rounded-full p-4 mb-3">
                                                <FaFileAlt className="text-2xl text-gray-700" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Ver Registro</h3>
                                            <p className="text-sm text-gray-600">Consultar registro de actividades</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Avisos/Noticias</h2>
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

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total de solicitudes:</p>
                                <p className="text-2xl font-bold text-gray-900">{adminData.totalSolicitudes}</p>
                            </div>
                            <FaClipboardList className="text-4xl text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pendientes:</p>
                                <p className="text-2xl font-bold text-gray-900">{adminData.pendientes}</p>
                            </div>
                            <FaCalendarAlt className="text-4xl text-yellow-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Aprobadas:</p>
                                <p className="text-2xl font-bold text-gray-900">{adminData.aprobadas}</p>
                            </div>
                            <FaCalendarCheck className="text-4xl text-green-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdministrador;