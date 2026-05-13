import { useState } from 'react';
import { FaBook, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

function AdministrarAsignaturas() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFacultad, setFilterFacultad] = useState('');
    const [selectedAsignatura, setSelectedAsignatura] = useState(null);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        creditos: '',
        facultad: '',
        departamento: '',
        semestreRecomendado: '',
        descripcion: '',
        prerrequisitos: ''
    });

    const [asignaturas, setAsignaturas] = useState([
        {
            id: 1,
            codigo: 'ISOFT-101',
            nombre: 'Programación Orientada a Objetos',
            creditos: 3,
            facultad: 'Ingeniería',
            departamento: 'Sistemas',
            semestreRecomendado: 3,
            descripcion: 'Fundamentos de POO y diseño de software',
            prerrequisitos: 'ISOFT-100'
        },
        {
            id: 2,
            codigo: 'ISOFT-201',
            nombre: 'Bases de Datos',
            creditos: 4,
            facultad: 'Ingeniería',
            departamento: 'Sistemas',
            semestreRecomendado: 4,
            descripcion: 'Diseño y gestión de bases de datos relacionales',
            prerrequisitos: 'ISOFT-101'
        },
        {
            id: 3,
            codigo: 'ICIV-101',
            nombre: 'Mecánica de Materiales',
            creditos: 4,
            facultad: 'Ingeniería',
            departamento: 'Civil',
            semestreRecomendado: 5,
            descripcion: 'Estudio de esfuerzos y deformaciones en materiales',
            prerrequisitos: 'ICIV-100'
        },
        {
            id: 4,
            codigo: 'MAT-201',
            nombre: 'Cálculo Diferencial',
            creditos: 4,
            facultad: 'Ciencias',
            departamento: 'Matemáticas',
            semestreRecomendado: 2,
            descripcion: 'Fundamentos del cálculo diferencial',
            prerrequisitos: 'MAT-100'
        },
        {
            id: 5,
            codigo: 'ISOFT-301',
            nombre: 'Ingeniería de Software',
            creditos: 3,
            facultad: 'Ingeniería',
            departamento: 'Sistemas',
            semestreRecomendado: 6,
            descripcion: 'Metodologías y procesos de desarrollo de software',
            prerrequisitos: 'ISOFT-201'
        }
    ]);

    const filteredAsignaturas = asignaturas.filter(asignatura => {
        const matchesSearch = asignatura.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asignatura.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asignatura.departamento.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFacultad = filterFacultad === '' || asignatura.facultad === filterFacultad;
        return matchesSearch && matchesFacultad;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            codigo: '',
            nombre: '',
            creditos: '',
            facultad: '',
            departamento: '',
            semestreRecomendado: '',
            descripcion: '',
            prerrequisitos: ''
        });
        setShowModal(true);
    };

    const handleEdit = (asignatura) => {
        setModalMode('edit');
        setSelectedAsignatura(asignatura);
        setFormData({
            codigo: asignatura.codigo,
            nombre: asignatura.nombre,
            creditos: asignatura.creditos.toString(),
            facultad: asignatura.facultad,
            departamento: asignatura.departamento,
            semestreRecomendado: asignatura.semestreRecomendado.toString(),
            descripcion: asignatura.descripcion,
            prerrequisitos: asignatura.prerrequisitos
        });
        setShowModal(true);
    };

    const handleDelete = (asignaturaId) => {
        if (window.confirm('¿Está seguro de eliminar esta asignatura?')) {
            setAsignaturas(asignaturas.filter(a => a.id !== asignaturaId));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (modalMode === 'create') {
            const newAsignatura = {
                id: asignaturas.length + 1,
                ...formData,
                creditos: parseInt(formData.creditos),
                semestreRecomendado: parseInt(formData.semestreRecomendado)
            };
            setAsignaturas([...asignaturas, newAsignatura]);
        } else {
            setAsignaturas(asignaturas.map(a =>
                a.id === selectedAsignatura.id ? {
                    ...a,
                    ...formData,
                    creditos: parseInt(formData.creditos),
                    semestreRecomendado: parseInt(formData.semestreRecomendado)
                } : a
            ));
        }

        setShowModal(false);
    };

    const getTotalCreditos = () => {
        return asignaturas.reduce((sum, asignatura) => sum + asignatura.creditos, 0);
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
                                <FaBook className="mr-3 text-green-500" />
                                Administrar Asignaturas
                            </h1>
                            <p className="text-gray-600 mt-2">Gestiona el catálogo de asignaturas del sistema</p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Nueva Asignatura
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, código o departamento..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

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
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Créditos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Facultad
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Departamento
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Semestre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAsignaturas.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron asignaturas
                                    </td>
                                </tr>
                            ) : (
                                filteredAsignaturas.map((asignatura) => (
                                    <tr key={asignatura.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {asignatura.codigo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {asignatura.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {asignatura.creditos}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asignatura.facultad}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asignatura.departamento}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {asignatura.semestreRecomendado}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(asignatura)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(asignatura.id)}
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
                        <p className="text-sm text-gray-600">Total Asignaturas</p>
                        <p className="text-2xl font-bold text-gray-900">{asignaturas.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Total Créditos</p>
                        <p className="text-2xl font-bold text-green-600">{getTotalCreditos()}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Ingeniería</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {asignaturas.filter(a => a.facultad === 'Ingeniería').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Ciencias</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {asignaturas.filter(a => a.facultad === 'Ciencias').length}
                        </p>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {modalMode === 'create' ? 'Crear Nueva Asignatura' : 'Editar Asignatura'}
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Código"
                                            type="text"
                                            value={formData.codigo}
                                            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                                            placeholder="Ej: ISOFT-101"
                                            required
                                        />
                                        <Input
                                            label="Créditos"
                                            type="number"
                                            value={formData.creditos}
                                            onChange={(e) => setFormData({...formData, creditos: e.target.value})}
                                            placeholder="Ej: 3"
                                            min="1"
                                            max="6"
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Nombre de la Asignatura"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                        placeholder="Ej: Programación Orientada a Objetos"
                                        required
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Select
                                            label="Facultad"
                                            value={formData.facultad}
                                            onChange={(e) => setFormData({...formData, facultad: e.target.value})}
                                            options={[
                                                { value: '', label: 'Seleccione una facultad' },
                                                { value: 'Ingeniería', label: 'Ingeniería' },
                                                { value: 'Ciencias', label: 'Ciencias' },
                                                { value: 'Economía', label: 'Economía' }
                                            ]}
                                            required
                                        />
                                        <Input
                                            label="Departamento"
                                            type="text"
                                            value={formData.departamento}
                                            onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                                            placeholder="Ej: Sistemas"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Semestre Recomendado"
                                            type="number"
                                            value={formData.semestreRecomendado}
                                            onChange={(e) => setFormData({...formData, semestreRecomendado: e.target.value})}
                                            placeholder="Ej: 3"
                                            min="1"
                                            max="10"
                                            required
                                        />
                                        <Input
                                            label="Prerrequisitos"
                                            type="text"
                                            value={formData.prerrequisitos}
                                            onChange={(e) => setFormData({...formData, prerrequisitos: e.target.value})}
                                            placeholder="Ej: ISOFT-100 (opcional)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                            placeholder="Descripción de la asignatura..."
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            required
                                        />
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
                                        {modalMode === 'create' ? 'Crear Asignatura' : 'Guardar Cambios'}
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

export default AdministrarAsignaturas;