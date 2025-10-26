import { useState } from 'react';
import { FaBook, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

function AdministrarMaterias() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMateria, setSelectedMateria] = useState(null);

    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        creditos: '',
        prerequisitos: ''
    });

    const [materias, setMaterias] = useState([
        {
            id: 1,
            codigo: 'ISOFT-101',
            nombre: 'Programación Orientada a Objetos',
            creditos: 3,
            prerequisitos: 'ISOFT-100'
        },
        {
            id: 2,
            codigo: 'ISOFT-201',
            nombre: 'Bases de Datos',
            creditos: 4,
            prerequisitos: 'ISOFT-101'
        },
        {
            id: 3,
            codigo: 'ICIV-101',
            nombre: 'Mecánica de Materiales',
            creditos: 4,
            prerequisitos: 'ICIV-100'
        },
        {
            id: 4,
            codigo: 'MAT-201',
            nombre: 'Cálculo Diferencial',
            creditos: 4,
            prerequisitos: 'MAT-100'
        },
        {
            id: 5,
            codigo: 'ISOFT-301',
            nombre: 'Ingeniería de Software',
            creditos: 3,
            prerequisitos: 'ISOFT-201'
        }
    ]);

    const filteredMaterias = materias.filter(materia => {
        const matchesSearch = materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.codigo.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            id: '',
            nombre: '',
            creditos: '',
            prerequisitos: ''
        });
        setShowModal(true);
    };

    const handleEdit = (materia) => {
        setModalMode('edit');
        setSelectedMateria(materia);
        setFormData({
            id: materia.codigo,
            nombre: materia.nombre,
            creditos: materia.creditos.toString(),
            prerequisitos: materia.prerequisitos
        });
        setShowModal(true);
    };

    const handleDelete = (materiaId) => {
        if (window.confirm('¿Está seguro de eliminar esta materia?')) {
            setMaterias(materias.filter(m => m.id !== materiaId));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (modalMode === 'create') {
            const newMateria = {
                id: materias.length + 1,
                codigo: formData.id,
                nombre: formData.nombre,
                creditos: parseInt(formData.creditos),
                prerequisitos: formData.prerequisitos
            };
            setMaterias([...materias, newMateria]);
        } else {
            setMaterias(materias.map(m =>
                m.id === selectedMateria.id ? {
                    ...m,
                    codigo: formData.id,
                    nombre: formData.nombre,
                    creditos: parseInt(formData.creditos),
                    prerequisitos: formData.prerequisitos
                } : m
            ));
        }

        setShowModal(false);
    };

    const getTotalCreditos = () => {
        return materias.reduce((sum, materia) => sum + materia.creditos, 0);
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
                                <FaBook className="mr-3 text-green-500" />
                                Administrar Materias
                            </h1>
                            <p className="text-gray-600 mt-2">Gestiona el catálogo de materias del plan de estudios</p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Nueva Materia
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                    Prerrequisitos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMaterias.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron materias
                                    </td>
                                </tr>
                            ) : (
                                filteredMaterias.map((materia) => (
                                    <tr key={materia.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {materia.codigo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {materia.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {materia.creditos}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {materia.prerequisitos || 'Ninguno'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(materia)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(materia.id)}
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

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Total Materias</p>
                        <p className="text-2xl font-bold text-gray-900">{materias.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Total Créditos</p>
                        <p className="text-2xl font-bold text-green-600">{getTotalCreditos()}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Promedio Créditos</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {materias.length > 0 ? (getTotalCreditos() / materias.length).toFixed(1) : 0}
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
                                    {modalMode === 'create' ? 'Crear Nueva Materia' : 'Editar Materia'}
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
                                            value={formData.id}
                                            onChange={(e) => setFormData({...formData, id: e.target.value})}
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
                                        label="Nombre de la Materia"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                        placeholder="Ej: Programación Orientada a Objetos"
                                        required
                                    />

                                    <Input
                                        label="Prerrequisitos"
                                        type="text"
                                        value={formData.prerequisitos}
                                        onChange={(e) => setFormData({...formData, prerequisitos: e.target.value})}
                                        placeholder="Ej: ISOFT-100 (opcional)"
                                    />
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
                                        {modalMode === 'create' ? 'Crear Materia' : 'Guardar Cambios'}
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

export default AdministrarMaterias;