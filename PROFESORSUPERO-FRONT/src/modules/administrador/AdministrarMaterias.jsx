import { useState, useEffect } from "react";
import { FaBook, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import api from "../../services/api";

function AdministrarMaterias() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [formData, setFormData] = useState({ id: "", nombre: "", creditos: "", prerequisitos: "" });
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(false);

    // 📥 Cargar materias al inicio
    useEffect(() => {
        fetchMaterias();
    }, []);

    const fetchMaterias = async () => {
        try {
            setLoading(true);
            const response = await api.get("/materias/nombre/a"); // o reemplaza por "/materias/all" si existe
            setMaterias(response.data || []);
        } catch (error) {
            console.error("Error al cargar materias:", error);
            alert("No se pudieron cargar las materias");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setModalMode("create");
        setFormData({ id: "", nombre: "", creditos: "", prerequisitos: "" });
        setShowModal(true);
    };

    const handleEdit = (materia) => {
        setModalMode("edit");
        setSelectedMateria(materia);
        setFormData({
            id: materia.id,
            nombre: materia.nombre,
            creditos: materia.creditos,
            prerequisitos: materia.prerequisitos?.join(", ") || "",
        });
        setShowModal(true);
    };

    const handleDelete = async (materiaId) => {
        if (!window.confirm("¿Está seguro de eliminar esta materia?")) return;
        try {
            await api.delete(`/materias/id/${materiaId}`);
            setMaterias(materias.filter((m) => m.id !== materiaId));
        } catch (error) {
            console.error("Error al eliminar materia:", error);
            alert("No se pudo eliminar la materia");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            if (modalMode === "create") {
                const nuevaMateria = {
                    id: formData.id,
                    nombre: formData.nombre,
                    creditos: parseInt(formData.creditos),
                    prerequisitos: formData.prerequisitos
                        ? formData.prerequisitos.split(",").map((p) => p.trim())
                        : [],
                };
                const response = await api.post("/materias/crear", nuevaMateria);
                setMaterias([...materias, response.data]);
            } else {
                // Actualización básica (nombre y créditos)
                await api.patch(`/materias/id/${formData.id}/nombre`, null, {
                    params: { nombre: formData.nombre },
                });
                await api.patch(`/materias/id/${formData.id}/creditos`, null, {
                    params: { creditos: parseInt(formData.creditos) },
                });

                setMaterias((prev) =>
                    prev.map((m) =>
                        m.id === formData.id
                            ? { ...m, nombre: formData.nombre, creditos: formData.creditos }
                            : m
                    )
                );
            }
            setShowModal(false);
        } catch (error) {
            console.error("Error al guardar materia:", error);
            alert("No se pudo guardar la materia");
        }
    };

    const filteredMaterias = materias.filter(
        (m) =>
            m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTotalCreditos = () => materias.reduce((sum, m) => sum + (m.creditos || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-gray-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="bg-green-500 p-2 rounded-lg">
                                <span className="text-2xl">📚</span>
                            </div>
                            <span className="ml-3 text-xl font-bold">SIRHA</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="/dashboard/administrador" className="hover:text-gray-300 px-3 py-2 text-sm font-medium">
                                Dashboard
                            </a>
                            <a href="/dashboard/admin/solicitudes" className="hover:text-gray-300 px-3 py-2 text-sm font-medium">
                                Solicitudes
                            </a>
                            <button className="hover:text-gray-300 px-3 py-2 text-sm font-medium">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            <FaBook className="mr-3 text-green-500" />
                            Administrar Materias
                        </h1>
                        <p className="text-gray-600 mt-2">Gestiona el catálogo de materias del plan de estudios</p>
                    </div>
                    <Button onClick={handleCreate} className="bg-green-500 hover:bg-green-600 text-white flex items-center">
                        <FaPlus className="mr-2" />
                        Nueva Materia
                    </Button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {loading ? (
                        <div className="p-6 text-center text-gray-600">Cargando materias...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créditos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prerrequisitos</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMaterias.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 py-4">
                                        No se encontraron materias
                                    </td>
                                </tr>
                            ) : (
                                filteredMaterias.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{m.id}</td>
                                        <td className="px-6 py-4">{m.nombre}</td>
                                        <td className="px-6 py-4">{m.creditos}</td>
                                        <td className="px-6 py-4">{m.prerequisitos?.join(", ") || "Ninguno"}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleEdit(m)} className="text-blue-600 hover:text-blue-900 mr-4">
                                                <FaEdit className="inline mr-1" />
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-900">
                                                <FaTrash className="inline mr-1" />
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    {modalMode === "create" ? "Crear Nueva Materia" : "Editar Materia"}
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
                                            required
                                        />
                                        <Input
                                            label="Créditos"
                                            type="number"
                                            value={formData.creditos}
                                            onChange={(e) => setFormData({ ...formData, creditos: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Nombre de la Materia"
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        required
                                    />

                                    <Input
                                        label="Prerrequisitos"
                                        type="text"
                                        value={formData.prerequisitos}
                                        onChange={(e) => setFormData({ ...formData, prerequisitos: e.target.value })}
                                        placeholder="Ej: ISOFT-100, MAT-101"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 mt-6">
                                    <Button type="button" onClick={() => setShowModal(false)} className="bg-gray-300">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                                        {modalMode === "create" ? "Crear Materia" : "Guardar Cambios"}
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
