import { useState } from 'react';
import { FaClipboardList, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

function VerSolicitudesAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterTipo, setFilterTipo] = useState('');
    const [filterFacultad, setFilterFacultad] = useState('');

    const [solicitudes] = useState([
        {
            id: 1,
            codigo: 'SOL-2025-001',
            estudiante: {
                nombre: 'Juan Pérez',
                codigo: '2021101234'
            },
            tipo: 'cambio_grupo',
            materia: 'Programación Orientada a Objetos',
            grupoActual: 'Grupo A',
            grupoSolicitado: 'Grupo B',
            fecha: '2025-01-20',
            estado: 'pendiente',
            facultad: 'Ingeniería'
        },
        {
            id: 2,
            codigo: 'SOL-2025-002',
            estudiante: {
                nombre: 'María García',
                codigo: '2020105678'
            },
            tipo: 'cambio_materia',
            materia: 'Cálculo Diferencial',
            materiaSolicitada: 'Álgebra Lineal',
            fecha: '2025-01-21',
            estado: 'en_revision',
            facultad: 'Ingeniería'
        },
        {
            id: 3,
            codigo: 'SOL-2025-003',
            estudiante: {
                nombre: 'Carlos Rodríguez',
                codigo: '2021102345'
            },
            tipo: 'desercion',
            materia: 'Física Mecánica',
            fecha: '2025-01-19',
            estado: 'aprobada',
            facultad: 'Ingeniería'
        },
        {
            id: 4,
            codigo: 'SOL-2025-004',
            estudiante: {
                nombre: 'Ana Martínez',
                codigo: '2022103456'
            },
            tipo: 'cambio_grupo',
            materia: 'Bases de Datos',
            grupoActual: 'Grupo C',
            grupoSolicitado: 'Grupo A',
            fecha: '2025-01-22',
            estado: 'rechazada',
            facultad: 'Ingeniería'
        },
        {
            id: 5,
            codigo: 'SOL-2025-005',
            estudiante: {
                nombre: 'Luis Fernández',
                codigo: '2021104567'
            },
            tipo: 'cambio_materia',
            materia: 'Estadística',
            materiaSolicitada: 'Probabilidad',
            fecha: '2025-01-23',
            estado: 'pendiente',
            facultad: 'Ciencias'
        }
    ]);

    const filteredSolicitudes = solicitudes.filter(solicitud => {
        const matchesSearch = solicitud.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            solicitud.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            solicitud.estudiante.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            solicitud.materia.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEstado = filterEstado === '' || solicitud.estado === filterEstado;
        const matchesTipo = filterTipo === '' || solicitud.tipo === filterTipo;
        const matchesFacultad = filterFacultad === '' || solicitud.facultad === filterFacultad;
        return matchesSearch && matchesEstado && matchesTipo && matchesFacultad;
    });

    const getEstadoBadgeColor = (estado) => {
        switch(estado) {
            case 'pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'en_revision': return 'bg-blue-100 text-blue-800';
            case 'aprobada': return 'bg-green-100 text-green-800';
            case 'rechazada': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getEstadoLabel = (estado) => {
        const estados = {
            'pendiente': 'Pendiente',
            'en_revision': 'En Revisión',
            'aprobada': 'Aprobada',
            'rechazada': 'Rechazada'
        };
        return estados[estado] || estado;
    };

    const getTipoLabel = (tipo) => {
        const tipos = {
            'cambio_grupo': 'Cambio de Grupo',
            'cambio_materia': 'Cambio de Materia',
            'desercion': 'Deserción'
        };
        return tipos[tipo] || tipo;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

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
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <FaClipboardList className="mr-3 text-green-500" />
                                Ver Todas las Solicitudes
                            </h1>
                            <p className="text-gray-600 mt-2">Revisa y gestiona todas las solicitudes del sistema</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-4">
                        <FaFilter className="text-gray-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar solicitud..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <Select
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los estados' },
                                { value: 'pendiente', label: 'Pendiente' },
                                { value: 'en_revision', label: 'En Revisión' },
                                { value: 'aprobada', label: 'Aprobada' },
                                { value: 'rechazada', label: 'Rechazada' }
                            ]}
                        />

                        <Select
                            value={filterTipo}
                            onChange={(e) => setFilterTipo(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los tipos' },
                                { value: 'cambio_grupo', label: 'Cambio de Grupo' },
                                { value: 'cambio_materia', label: 'Cambio de Materia' },
                                { value: 'desercion', label: 'Deserción' }
                            ]}
                        />

                        <Select
                            value={filterFacultad}
                            onChange={(e) => setFilterFacultad(e.target.value)}
                            options={[
                                { value: '', label: 'Todas las facultades' },
                                { value: 'Ingeniería', label: 'Ingeniería' },
                                { value: 'Ciencias', label: 'Ciencias' },
                                { value: 'Economía', label: 'Economía' }
                            ]}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Código
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estudiante
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Materia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSolicitudes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron solicitudes
                                    </td>
                                </tr>
                            ) : (
                                filteredSolicitudes.map((solicitud) => (
                                    <tr key={solicitud.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {solicitud.codigo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{solicitud.estudiante.nombre}</div>
                                            <div className="text-sm text-gray-500">{solicitud.estudiante.codigo}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {getTipoLabel(solicitud.tipo)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {solicitud.materia}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(solicitud.fecha)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeColor(solicitud.estado)}`}>
                          {getEstadoLabel(solicitud.estado)}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Button
                                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center"
                                            >
                                                <FaEye className="mr-1" />
                                                Ver Detalle
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Total Solicitudes</p>
                        <p className="text-2xl font-bold text-gray-900">{solicitudes.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Pendientes</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {solicitudes.filter(s => s.estado === 'pendiente').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Aprobadas</p>
                        <p className="text-2xl font-bold text-green-600">
                            {solicitudes.filter(s => s.estado === 'aprobada').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Rechazadas</p>
                        <p className="text-2xl font-bold text-red-600">
                            {solicitudes.filter(s => s.estado === 'rechazada').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerSolicitudesAdmin;