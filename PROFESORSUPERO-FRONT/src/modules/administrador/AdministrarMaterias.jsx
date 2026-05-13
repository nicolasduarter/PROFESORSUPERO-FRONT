import { useState, useEffect } from 'react';
import { FaBook, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import api from '../../services/api';

function AdministrarMaterias() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [formData, setFormData] = useState({ id: '', nombre: '', creditos: '' });
    const [materias, setMaterias] = useState([]);

    // 🔹 Obtener todas las materias desde el backend
    const fetchMaterias = async () => {
        try {
            const response = await api.get('/materias');
            setMaterias(response.data);
        } catch (error) {
            console.error("❌ Error al obtener materias:", error);
            alert("No se pudieron cargar las materias desde el servidor.");
        }
    };

    useEffect(() => {
        fetchMaterias();
    }, []);

    // 🔹 Filtro de búsqueda
    const filteredMaterias = materias.filter(materia =>
        materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materia.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🔹 Crear nueva materia
    const handleCreate = () => {
        setModalMode('create');
        setFormData({ id: '', nombre: '', creditos: '' });
        setShowModal(true);
    };

    // 🔹 Editar materia existente
    const handleEdit = (materia) => {
        setModalMode('edit');
        setSelectedMateria(materia);
        setFormData({
            id: materia.id,
            nombre: materia.nombre,
            creditos: materia.creditos.toString()
        });
        setShowModal(true);
    };

    // 🔹 Eliminar materia
    const handleDelete = async (materiaId) => {
        if (window.confirm('¿Está seguro de eliminar esta materia?')) {
            try {
                await api.delete(`/materias/id/${materiaId}`);
                alert("Materia eliminada correctamente ✅");
                fetchMaterias(); // recargar lista
            } catch (error) {
                console.error("❌ Error al eliminar materia:", error);
                alert("No se pudo eliminar la materia.");
            }
        }
    };

    // 🔹 Guardar materia (crear o editar)
    const handleSave = async (e) => {
        e.preventDefault();

        try {
            if (modalMode === 'create') {
                await api.post('/materias/crear', {
                    id: formData.id,
                    nombre: formData.nombre,
                    creditos: parseInt(formData.creditos)
                });
                alert("Materia creada correctamente ✅");
            } else if (modalMode === 'edit') {
                // Actualiza nombre
                if (formData.nombre !== selectedMateria.nombre) {
                    await api.patch(`/materias/id/${formData.id}/nombre`, null, {
                        params: { nombre: formData.nombre }
                    });
                }
                // Actualiza créditos
                if (parseInt(formData.creditos) !== selectedMateria.creditos) {
                    await api.patch(`/materias/id/${formData.id}/creditos`, null, {
                        params: { creditos: parseInt(formData.creditos) }
                    });
                }
                alert("Materia actualizada correctamente ✅");
            }

            setShowModal(false);
            fetchMaterias(); // recargar materias
        } catch (error) {
            console.error("❌ Error al guardar materia:", error);
            alert("Ocurrió un error al guardar los cambios.");
        }
    };

    // 🔹 Calcular totales
    const getTotalCreditos = () => materias.reduce((sum, materia) => sum + materia.creditos, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* NAVBAR */}
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

            {/* CONTENIDO PRINCIPAL */}
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

                {/* BUSCADOR */}
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

                {/* TABLA DE MATERIAS */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMaterias.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron materias
                                    </td>
                                </tr>
                            ) : (
                                filteredMaterias.map((materia) => (
                                    <tr key={materia.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{materia.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{materia.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{materia.creditos}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleEdit(materia)} className="text-blue-600 hover:text-blue-900 mr-4">
                                                <FaEdit className="inline mr-1" /> Editar
                                            </button>
                                            <button onClick={() => handleDelete(materia.id)} className="text-red-600 hover:text-red-900">
                                                <FaTrash className="inline mr-1" /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ESTADÍSTICAS */}
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

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {modalMode === 'create' ? 'Crear Nueva Materia' : 'Editar Materia'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
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
                                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                            placeholder="Ej: ISOFT-101"
                                            required
                                            disabled={modalMode === 'edit'}
                                        />
                                        <Input
                                            label="Créditos"
                                            type="number"
                                            value={formData.creditos}
                                            onChange={(e) => setFormData({ ...formData, creditos: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        placeholder="Ej: Programación Orientada a Objetos"
                                        required
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


