import { useState } from 'react';
import { FaUsers, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaClock } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

function AdministrarGrupos() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMateria, setFilterMateria] = useState('');
    const [selectedGrupo, setSelectedGrupo] = useState(null);

    const [formData, setFormData] = useState({
        idGrupo: '',
        nombre: '',
        materia: '',
        profesor: '',
        cupoMax: '',
        cupo: '',
        clases: []
    });

    const [claseTemp, setClaseTemp] = useState({
        diaSemana: '',
        horaInicio: '',
        horaFin: '',
        salon: ''
    });

    const materias = [
        { value: 'ISOFT-101', label: 'Programación Orientada a Objetos' },
        { value: 'ISOFT-201', label: 'Bases de Datos' },
        { value: 'MAT-201', label: 'Cálculo Diferencial' },
        { value: 'ICIV-101', label: 'Mecánica de Materiales' }
    ];

    const [grupos, setGrupos] = useState([
        {
            id: 1,
            idGrupo: 'POO-A-2025-1',
            nombre: 'Grupo A',
            materia: 'ISOFT-101',
            materiaNombre: 'Programación Orientada a Objetos',
            profesor: 'Dr. García Pérez',
            cupo: 28,
            cupoMax: 35,
            clases: [
                { diaSemana: 'Lunes', horaInicio: '07:00', horaFin: '09:00', salon: '301' },
                { diaSemana: 'Miércoles', horaInicio: '07:00', horaFin: '09:00', salon: '301' }
            ]
        },
        {
            id: 2,
            idGrupo: 'POO-B-2025-1',
            nombre: 'Grupo B',
            materia: 'ISOFT-101',
            materiaNombre: 'Programación Orientada a Objetos',
            profesor: 'Dra. Martínez López',
            cupo: 30,
            cupoMax: 30,
            clases: [
                { diaSemana: 'Martes', horaInicio: '14:00', horaFin: '16:00', salon: '205' },
                { diaSemana: 'Jueves', horaInicio: '14:00', horaFin: '16:00', salon: '205' }
            ]
        },
        {
            id: 3,
            idGrupo: 'BD-A-2025-1',
            nombre: 'Grupo A',
            materia: 'ISOFT-201',
            materiaNombre: 'Bases de Datos',
            profesor: 'Dr. Rodríguez Silva',
            cupo: 25,
            cupoMax: 32,
            clases: [
                { diaSemana: 'Lunes', horaInicio: '09:00', horaFin: '11:00', salon: '402' },
                { diaSemana: 'Miércoles', horaInicio: '09:00', horaFin: '11:00', salon: '402' }
            ]
        }
    ]);

    const filteredGrupos = grupos.filter(grupo => {
        const matchesSearch = grupo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grupo.idGrupo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grupo.profesor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grupo.materiaNombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMateria = filterMateria === '' || grupo.materia === filterMateria;
        return matchesSearch && matchesMateria;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            idGrupo: '',
            nombre: '',
            materia: '',
            profesor: '',
            cupoMax: '',
            cupo: '0',
            clases: []
        });
        setShowModal(true);
    };

    const handleEdit = (grupo) => {
        setModalMode('edit');
        setSelectedGrupo(grupo);
        setFormData({
            idGrupo: grupo.idGrupo,
            nombre: grupo.nombre,
            materia: grupo.materia,
            profesor: grupo.profesor,
            cupoMax: grupo.cupoMax.toString(),
            cupo: grupo.cupo.toString(),
            clases: [...grupo.clases]
        });
        setShowModal(true);
    };

    const handleDelete = (grupoId) => {
        if (window.confirm('¿Está seguro de eliminar este grupo?')) {
            setGrupos(grupos.filter(g => g.id !== grupoId));
        }
    };

    const handleAddClase = () => {
        if (claseTemp.diaSemana && claseTemp.horaInicio && claseTemp.horaFin && claseTemp.salon) {
            setFormData({
                ...formData,
                clases: [...formData.clases, { ...claseTemp }]
            });
            setClaseTemp({
                diaSemana: '',
                horaInicio: '',
                horaFin: '',
                salon: ''
            });
        }
    };

    const handleRemoveClase = (index) => {
        setFormData({
            ...formData,
            clases: formData.clases.filter((_, i) => i !== index)
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (formData.clases.length === 0) {
            alert('Debe agregar al menos una clase (horario) al grupo');
            return;
        }

        const materiaNombre = materias.find(m => m.value === formData.materia)?.label || '';

        if (modalMode === 'create') {
            const newGrupo = {
                id: grupos.length + 1,
                idGrupo: formData.idGrupo,
                nombre: formData.nombre,
                materia: formData.materia,
                materiaNombre: materiaNombre,
                profesor: formData.profesor,
                cupoMax: parseInt(formData.cupoMax),
                cupo: parseInt(formData.cupo),
                clases: formData.clases
            };
            setGrupos([...grupos, newGrupo]);
        } else {
            setGrupos(grupos.map(g =>
                g.id === selectedGrupo.id ? {
                    ...g,
                    idGrupo: formData.idGrupo,
                    nombre: formData.nombre,
                    materia: formData.materia,
                    materiaNombre: materiaNombre,
                    profesor: formData.profesor,
                    cupoMax: parseInt(formData.cupoMax),
                    cupo: parseInt(formData.cupo),
                    clases: formData.clases
                } : g
            ));
        }

        setShowModal(false);
    };

    const getCupoPercentage = (cupo, cupoMax) => {
        return Math.round((cupo / cupoMax) * 100);
    };

    const getCupoColor = (percentage) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 70) return 'bg-yellow-500';
        return 'bg-green-500';
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
                            <a href="/dashboard/admin/solicitudes" className="hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
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
                                <FaUsers className="mr-3 text-green-500" />
                                Administrar Grupos
                            </h1>
                            <p className="text-gray-600 mt-2">Gestiona los grupos y sus horarios de clase</p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Nuevo Grupo
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por grupo, materia o profesor..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <Select
                            value={filterMateria}
                            onChange={(e) => setFilterMateria(e.target.value)}
                            options={[
                                { value: '', label: 'Todas las materias' },
                                ...materias
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
                                    ID Grupo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Materia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profesor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Horarios
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cupos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredGrupos.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron grupos
                                    </td>
                                </tr>
                            ) : (
                                filteredGrupos.map((grupo) => {
                                    const percentage = getCupoPercentage(grupo.cupo, grupo.cupoMax);
                                    return (
                                        <tr key={grupo.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {grupo.idGrupo}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <div className="font-medium">{grupo.nombre}</div>
                                                <div className="text-gray-500 text-xs">{grupo.materiaNombre}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {grupo.profesor}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {grupo.clases.map((clase, idx) => (
                                                    <div key={idx} className="flex items-center mb-1">
                                                        <FaClock className="mr-1 text-gray-400" />
                                                        <span>{clase.diaSemana} {clase.horaInicio}-{clase.horaFin} ({clase.salon})</span>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 mb-1">
                                                    {grupo.cupo}/{grupo.cupoMax} ({percentage}%)
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${getCupoColor(percentage)}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(grupo)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                >
                                                    <FaEdit className="inline mr-1" />
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(grupo.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash className="inline mr-1" />
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Total Grupos</p>
                        <p className="text-2xl font-bold text-gray-900">{grupos.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Cupos Totales</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {grupos.reduce((sum, g) => sum + g.cupoMax, 0)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Estudiantes Inscritos</p>
                        <p className="text-2xl font-bold text-green-600">
                            {grupos.reduce((sum, g) => sum + g.cupo, 0)}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Cupos Disponibles</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {grupos.reduce((sum, g) => sum + (g.cupoMax - g.cupo), 0)}
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {modalMode === 'create' ? 'Crear Nuevo Grupo' : 'Editar Grupo'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes className="text-2xl" />
                                </button>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="space-y-6">
                                    <div className="border-b pb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Grupo</h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input
                                                    label="ID del Grupo"
                                                    type="text"
                                                    value={formData.idGrupo}
                                                    onChange={(e) => setFormData({...formData, idGrupo: e.target.value})}
                                                    placeholder="Ej: POO-A-2025-1"
                                                    required
                                                />
                                                <Input
                                                    label="Nombre del Grupo"
                                                    type="text"
                                                    value={formData.nombre}
                                                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                                    placeholder="Ej: Grupo A"
                                                    required
                                                />
                                            </div>

                                            <Select
                                                label="Materia"
                                                value={formData.materia}
                                                onChange={(e) => setFormData({...formData, materia: e.target.value})}
                                                options={[
                                                    { value: '', label: 'Seleccione una materia' },
                                                    ...materias
                                                ]}
                                                required
                                            />

                                            <Input
                                                label="Profesor"
                                                type="text"
                                                value={formData.profesor}
                                                onChange={(e) => setFormData({...formData, profesor: e.target.value})}
                                                placeholder="Ej: Dr. García Pérez"
                                                required
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input
                                                    label="Cupo Máximo"
                                                    type="number"
                                                    value={formData.cupoMax}
                                                    onChange={(e) => setFormData({...formData, cupoMax: e.target.value})}
                                                    placeholder="Ej: 35"
                                                    min="1"
                                                    required
                                                />
                                                <Input
                                                    label="Cupo Actual"
                                                    type="number"
                                                    value={formData.cupo}
                                                    onChange={(e) => setFormData({...formData, cupo: e.target.value})}
                                                    placeholder="Ej: 0"
                                                    min="0"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Horarios de Clase</h3>

                                        {formData.clases.length > 0 && (
                                            <div className="mb-4 space-y-2">
                                                {formData.clases.map((clase, index) => (
                                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                                        <div className="flex items-center space-x-4">
                                                            <FaClock className="text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-900">
                                {clase.diaSemana}
                              </span>
                                                            <span className="text-sm text-gray-600">
                                {clase.horaInicio} - {clase.horaFin}
                              </span>
                                                            <span className="text-sm text-gray-600">
                                Salón: {clase.salon}
                              </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveClase(index)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Agregar Horario</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <Select
                                                    label="Día de la Semana"
                                                    value={claseTemp.diaSemana}
                                                    onChange={(e) => setClaseTemp({...claseTemp, diaSemana: e.target.value})}
                                                    options={[
                                                        { value: '', label: 'Seleccione un día' },
                                                        { value: 'Lunes', label: 'Lunes' },
                                                        { value: 'Martes', label: 'Martes' },
                                                        { value: 'Miércoles', label: 'Miércoles' },
                                                        { value: 'Jueves', label: 'Jueves' },
                                                        { value: 'Viernes', label: 'Viernes' },
                                                        { value: 'Sábado', label: 'Sábado' }
                                                    ]}
                                                />
                                                <Input
                                                    label="Salón"
                                                    type="text"
                                                    value={claseTemp.salon}
                                                    onChange={(e) => setClaseTemp({...claseTemp, salon: e.target.value})}
                                                    placeholder="Ej: 301"
                                                />
                                                <Input
                                                    label="Hora Inicio"
                                                    type="time"
                                                    value={claseTemp.horaInicio}
                                                    onChange={(e) => setClaseTemp({...claseTemp, horaInicio: e.target.value})}
                                                />
                                                <Input
                                                    label="Hora Fin"
                                                    type="time"
                                                    value={claseTemp.horaFin}
                                                    onChange={(e) => setClaseTemp({...claseTemp, horaFin: e.target.value})}
                                                />
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={handleAddClase}
                                                className="bg-blue-500 hover:bg-blue-600 text-white mt-3 flex items-center"
                                            >
                                                <FaPlus className="mr-2" />
                                                Agregar Horario
                                            </Button>
                                        </div>
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
                                        {modalMode === 'create' ? 'Crear Grupo' : 'Guardar Cambios'}
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

export default AdministrarGrupos;