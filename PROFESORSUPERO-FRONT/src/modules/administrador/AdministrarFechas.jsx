import { useState } from 'react';
import { FaCalendarCheck, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

function AdministrarFechas() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTipo, setFilterTipo] = useState('');
    const [selectedFecha, setSelectedFecha] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        fechaInicio: '',
        fechaFin: '',
        descripcion: '',
        activo: true
    });

    const [fechas, setFechas] = useState([
        {
            id: 1,
            nombre: 'Periodo de Cambios Semestre 2025-1',
            tipo: 'cambios',
            fechaInicio: '2025-01-15',
            fechaFin: '2025-01-30',
            descripcion: 'Periodo habilitado para solicitudes de cambio de grupo y materia',
            activo: true
        },
        {
            id: 2,
            nombre: 'Inscripciones Semestre 2025-1',
            tipo: 'inscripciones',
            fechaInicio: '2025-01-05',
            fechaFin: '2025-01-12',
            descripcion: 'Periodo de inscripción de materias para el semestre 2025-1',
            activo: false
        },
        {
            id: 3,
            nombre: 'Exámenes Finales 2024-2',
            tipo: 'examenes',
            fechaInicio: '2024-12-01',
            fechaFin: '2024-12-15',
            descripcion: 'Periodo de exámenes finales del semestre 2024-2',
            activo: false
        },
        {
            id: 4,
            nombre: 'Deserción de Materias 2025-1',
            tipo: 'desercion',
            fechaInicio: '2025-02-01',
            fechaFin: '2025-02-28',
            descripcion: 'Periodo para solicitar deserción de materias sin penalización',
            activo: false
        }
    ]);

    const filteredFechas = fechas.filter(fecha => {
        const matchesSearch = fecha.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fecha.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipo = filterTipo === '' || fecha.tipo === filterTipo;
        return matchesSearch && matchesTipo;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            nombre: '',
            tipo: '',
            fechaInicio: '',
            fechaFin: '',
            descripcion: '',
            activo: true
        });
        setShowModal(true);
    };

    const handleEdit = (fecha) => {
        setModalMode('edit');
        setSelectedFecha(fecha);
        setFormData({
            nombre: fecha.nombre,
            tipo: fecha.tipo,
            fechaInicio: fecha.fechaInicio,
            fechaFin: fecha.fechaFin,
            descripcion: fecha.descripcion,
            activo: fecha.activo
        });
        setShowModal(true);
    };

    const handleDelete = (fechaId) => {
        if (window.confirm('¿Está seguro de eliminar esta fecha?')) {
            setFechas(fechas.filter(f => f.id !== fechaId));
        }
    };

    const handleToggleActivo = (fechaId) => {
        setFechas(fechas.map(f =>
            f.id === fechaId ? { ...f, activo: !f.activo } : f
        ));
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (modalMode === 'create') {
            const newFecha = {
                id: fechas.length + 1,
                ...formData
            };
            setFechas([...fechas, newFecha]);
        } else {
            setFechas(fechas.map(f =>
                f.id === selectedFecha.id ? { ...f, ...formData } : f
            ));
        }

        setShowModal(false);
    };

    const getTipoLabel = (tipo) => {
        const tipos = {
            'cambios': 'Cambios',
            'inscripciones': 'Inscripciones',
            'examenes': 'Exámenes',
            'desercion': 'Deserción'
        };
        return tipos[tipo] || tipo;
    };

    const getTipoBadgeColor = (tipo) => {
        switch(tipo) {
            case 'cambios': return 'bg-blue-100 text-blue-800';
            case 'inscripciones': return 'bg-green-100 text-green-800';
            case 'examenes': return 'bg-red-100 text-red-800';
            case 'desercion': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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
                                <FaCalendarCheck className="mr-3 text-green-500" />
                                Administrar Fechas Importantes
                            </h1>
                            <p className="text-gray-600 mt-2">Gestiona el calendario académico y periodos habilitados</p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Nueva Fecha
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre o descripción..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <Select
                            value={filterTipo}
                            onChange={(e) => setFilterTipo(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los tipos' },
                                { value: 'cambios', label: 'Cambios' },
                                { value: 'inscripciones', label: 'Inscripciones' },
                                { value: 'examenes', label: 'Exámenes' },
                                { value: 'desercion', label: 'Deserción' }
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
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha Inicio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha Fin
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
                            {filteredFechas.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron fechas
                                    </td>
                                </tr>
                            ) : (
                                filteredFechas.map((fecha) => (
                                    <tr key={fecha.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {fecha.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getTipoBadgeColor(fecha.tipo)}`}>
                          {getTipoLabel(fecha.tipo)}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(fecha.fechaInicio)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(fecha.fechaFin)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleActivo(fecha.id)}
                                                className="flex items-center"
                                            >
                                                {fecha.activo ? (
                                                    <>
                                                        <FaToggleOn className="text-green-500 text-2xl mr-2" />
                                                        <span className="text-sm text-green-600 font-medium">Activo</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaToggleOff className="text-gray-400 text-2xl mr-2" />
                                                        <span className="text-sm text-gray-500 font-medium">Inactivo</span>
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(fecha)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(fecha.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FaTrash className="inline mr-1" />
                                                Eliminar
                                            </button>
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
                        <p className="text-sm text-gray-600">Total Fechas</p>
                        <p className="text-2xl font-bold text-gray-900">{fechas.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Periodos Activos</p>
                        <p className="text-2xl font-bold text-green-600">
                            {fechas.filter(f => f.activo).length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Cambios</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {fechas.filter(f => f.tipo === 'cambios').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Inscripciones</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {fechas.filter(f => f.tipo === 'inscripciones').length}
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {modalMode === 'create' ? 'Crear Nueva Fecha' : 'Editar Fecha'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="space-y-4">
                                    <Input
                                        label="Nombre del Periodo"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                        placeholder="Ej: Periodo de Cambios Semestre 2025-1"
                                        required
                                    />

                                    <Select
                                        label="Tipo de Periodo"
                                        value={formData.tipo}
                                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                                        options={[
                                            { value: '', label: 'Seleccione un tipo' },
                                            { value: 'cambios', label: 'Cambios' },
                                            { value: 'inscripciones', label: 'Inscripciones' },
                                            { value: 'examenes', label: 'Exámenes' },
                                            { value: 'desercion', label: 'Deserción' }
                                        ]}
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Fecha de Inicio"
                                            type="date"
                                            value={formData.fechaInicio}
                                            onChange={(e) => setFormData({...formData, fechaInicio: e.target.value})}
                                            required
                                        />
                                        <Input
                                            label="Fecha de Fin"
                                            type="date"
                                            value={formData.fechaFin}
                                            onChange={(e) => setFormData({...formData, fechaFin: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                            placeholder="Descripción del periodo..."
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="activo"
                                            checked={formData.activo}
                                            onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                                            Periodo activo
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <Button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-green-500 hover:bg-green-600 text-white"
                                    >
                                        {modalMode === 'create' ? 'Crear Fecha' : 'Guardar Cambios'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdministrarFechas;