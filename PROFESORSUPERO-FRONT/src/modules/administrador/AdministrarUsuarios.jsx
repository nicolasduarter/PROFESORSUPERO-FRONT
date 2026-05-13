import { useState } from 'react';
import { FaUsers, FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

function AdministrarUsuarios() {
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        email: '',
        rol: '',
        facultad: '',
        carrera: '',
        semestre: ''
    });

    const [usuarios, setUsuarios] = useState([
        {
            id: 1,
            codigo: '2021101234',
            nombre: 'Juan Pérez',
            email: 'juan.perez@escuelaing.edu.co',
            rol: 'estudiante',
            facultad: 'Ingeniería',
            carrera: 'Ingeniería de Sistemas',
            semestre: '6'
        },
        {
            id: 2,
            codigo: '2020105678',
            nombre: 'María García',
            email: 'maria.garcia@escuelaing.edu.co',
            rol: 'estudiante',
            facultad: 'Ingeniería',
            carrera: 'Ingeniería Civil',
            semestre: '8'
        },
        {
            id: 3,
            codigo: 'DEC001',
            nombre: 'Carlos Rodríguez',
            email: 'carlos.rodriguez@escuelaing.edu.co',
            rol: 'decanatura',
            facultad: 'Ingeniería',
            carrera: 'N/A',
            semestre: 'N/A'
        },
        {
            id: 4,
            codigo: 'ADM001',
            nombre: 'Ana Martínez',
            email: 'ana.martinez@escuelaing.edu.co',
            rol: 'administrador',
            facultad: 'N/A',
            carrera: 'N/A',
            semestre: 'N/A'
        }
    ]);

    const filteredUsers = usuarios.filter(user => {
        const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === '' || user.rol === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleCreate = () => {
        setModalMode('create');
        setFormData({
            codigo: '',
            nombre: '',
            email: '',
            rol: '',
            facultad: '',
            carrera: '',
            semestre: ''
        });
        setShowModal(true);
    };

    const handleEdit = (user) => {
        setModalMode('edit');
        setSelectedUser(user);
        setFormData({
            codigo: user.codigo,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            facultad: user.facultad,
            carrera: user.carrera,
            semestre: user.semestre
        });
        setShowModal(true);
    };

    const handleDelete = (userId) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            setUsuarios(usuarios.filter(u => u.id !== userId));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (modalMode === 'create') {
            const newUser = {
                id: usuarios.length + 1,
                ...formData
            };
            setUsuarios([...usuarios, newUser]);
        } else {
            setUsuarios(usuarios.map(u =>
                u.id === selectedUser.id ? { ...u, ...formData } : u
            ));
        }

        setShowModal(false);
    };

    const getRoleBadgeColor = (rol) => {
        switch(rol) {
            case 'estudiante': return 'bg-blue-100 text-blue-800';
            case 'decanatura': return 'bg-purple-100 text-purple-800';
            case 'administrador': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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
                                <FaUsers className="mr-3 text-green-500" />
                                Administrar Usuarios
                            </h1>
                            <p className="text-gray-600 mt-2">Gestiona las cuentas de usuarios del sistema</p>
                        </div>
                        <Button
                            onClick={handleCreate}
                            className="bg-green-500 hover:bg-green-600 text-white flex items-center"
                        >
                            <FaPlus className="mr-2" />
                            Nuevo Usuario
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar por nombre, código o email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <Select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            options={[
                                { value: '', label: 'Todos los roles' },
                                { value: 'estudiante', label: 'Estudiante' },
                                { value: 'decanatura', label: 'Decanatura' },
                                { value: 'administrador', label: 'Administrador' }
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
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Facultad
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron usuarios
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {user.codigo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.rol)}`}>
                          {user.rol}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.facultad}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
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
                        <p className="text-sm text-gray-600">Total Usuarios</p>
                        <p className="text-2xl font-bold text-gray-900">{usuarios.length}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Estudiantes</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {usuarios.filter(u => u.rol === 'estudiante').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Decanatura</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {usuarios.filter(u => u.rol === 'decanatura').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-sm text-gray-600">Administradores</p>
                        <p className="text-2xl font-bold text-red-600">
                            {usuarios.filter(u => u.rol === 'administrador').length}
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
                                    {modalMode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
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
                                            placeholder="Ej: 2021101234"
                                            required
                                        />
                                        <Input
                                            label="Nombre Completo"
                                            type="text"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                    </div>

                                    <Input
                                        label="Email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="Ej: juan.perez@escuelaing.edu.co"
                                        required
                                    />

                                    <Select
                                        label="Rol"
                                        value={formData.rol}
                                        onChange={(e) => setFormData({...formData, rol: e.target.value})}
                                        options={[
                                            { value: '', label: 'Seleccione un rol' },
                                            { value: 'estudiante', label: 'Estudiante' },
                                            { value: 'decanatura', label: 'Decanatura' },
                                            { value: 'administrador', label: 'Administrador' }
                                        ]}
                                        required
                                    />

                                    {formData.rol === 'estudiante' && (
                                        <>
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
                                                    label="Semestre"
                                                    type="number"
                                                    value={formData.semestre}
                                                    onChange={(e) => setFormData({...formData, semestre: e.target.value})}
                                                    placeholder="Ej: 6"
                                                    min="1"
                                                    max="10"
                                                    required
                                                />
                                            </div>

                                        </>
                                    )}

                                    {formData.rol === 'decanatura' && (
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
                                    )}
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
                                        {modalMode === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
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

export default AdministrarUsuarios;