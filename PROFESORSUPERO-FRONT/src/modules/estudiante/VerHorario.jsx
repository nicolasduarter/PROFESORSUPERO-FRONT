"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Componente VerHorario - Muestra el horario semanal del estudiante
 * Permite navegar entre semanas, cambiar vista (calendario/lista) y aplicar filtros
 */
function VerHorario() {
    const navigate = useNavigate()

    // Estado para la vista actual (calendario o lista)
    const [vistaActual, setVistaActual] = useState("calendario")

    // Estado para la semana actual
    const [semanaActual, setSemanaActual] = useState(0) // 0 = semana actual

    // Estado para los filtros
    const [filtros, setFiltros] = useState({
        mostrarProfesores: true,
        horariosAMPM: true,
        mostrarTodas: true,
        soloObligatorias: false,
    })

    // Datos mock del horario
    const horarioMock = {
        lunes: [
            { materia: "Matemáticas", hora: "8:00 - 9:30 AM", profesor: "Prof. García", tipo: "obligatoria" },
            { materia: "Inglés", hora: "2:00 - 3:30 PM", profesor: "Prof. Johnson", tipo: "obligatoria" },
        ],
        martes: [
            { materia: "Historia", hora: "10:00 - 11:30 AM", profesor: "Prof. López", tipo: "obligatoria" },
            { materia: "Educación Física", hora: "4:00 - 5:30 PM", profesor: "Prof. Torres", tipo: "electiva" },
        ],
        miercoles: [
            { materia: "Física", hora: "8:00 - 9:30 AM", profesor: "Prof. Rodríguez", tipo: "obligatoria" },
            { materia: "Biología", hora: "2:00 - 3:30 PM", profesor: "Prof. Fernández", tipo: "obligatoria" },
        ],
        jueves: [
            { materia: "Química", hora: "10:00 - 11:30 AM", profesor: "Prof. Martínez", tipo: "obligatoria" },
            { materia: "Música", hora: "4:00 - 5:30 PM", profesor: "Prof. Vargas", tipo: "electiva" },
        ],
        viernes: [
            { materia: "Literatura", hora: "10:00 - 11:30 AM", profesor: "Prof. Sánchez", tipo: "obligatoria" },
            { materia: "Arte", hora: "2:00 - 3:30 PM", profesor: "Prof. Ruiz", tipo: "electiva" },
        ],
        sabado: [],
        domingo: [],
    }

    // Franjas horarias
    const horariosBase = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]

    // Días de la semana
    const diasSemana = [
        { nombre: "Lunes", numero: 20 },
        { nombre: "Martes", numero: 21 },
        { nombre: "Miércoles", numero: 22 },
        { nombre: "Jueves", numero: 23 },
        { nombre: "Viernes", numero: 24 },
        { nombre: "Sábado", numero: 25 },
        { nombre: "Domingo", numero: 26 },
    ]

    // Función para obtener la clase en un horario específico
    const obtenerClase = (dia, hora) => {
        const diaKey = dia.toLowerCase()
        const clases = horarioMock[diaKey] || []

        // Filtrar por tipo si es necesario
        const clasesFiltradas = filtros.soloObligatorias ? clases.filter((c) => c.tipo === "obligatoria") : clases

        return clasesFiltradas.find((clase) => clase.hora.startsWith(hora.replace(" AM", "").replace(" PM", "")))
    }

    // Función para cambiar filtros
    const toggleFiltro = (filtro) => {
        setFiltros((prev) => ({ ...prev, [filtro]: !prev[filtro] }))
    }

    // Función para navegar entre semanas
    const cambiarSemana = (direccion) => {
        setSemanaActual((prev) => prev + direccion)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-black text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate("/dashboard/estudiante")} className="text-white hover:text-gray-300">
                        ←
                    </button>
                    <h1 className="text-xl font-bold">SIRHA</h1>
                </div>
                <nav className="flex gap-6">
                    <button onClick={() => navigate("/dashboard/estudiante")} className="hover:text-gray-300">
                        Dashboard
                    </button>
                    <button onClick={() => navigate("/dashboard/estudiante/solicitudes")} className="hover:text-gray-300">
                        Solicitudes
                    </button>
                    <button onClick={() => navigate("/")} className="hover:text-gray-300">
                        Cerrar Sesión
                    </button>
                </nav>
            </header>

            {/* Contenido principal */}
            <main className="p-8">
                {/* Título y botones de vista */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Mi Horario de Clases</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setVistaActual("calendario")}
                            className={`px-4 py-2 rounded ${
                                vistaActual === "calendario" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-600 border"
                            }`}
                        >
                            📅 Vista de calendario
                        </button>
                        <button
                            onClick={() => setVistaActual("lista")}
                            className={`px-4 py-2 rounded ${
                                vistaActual === "lista" ? "bg-gray-200 text-gray-900" : "bg-white text-gray-600 border"
                            }`}
                        >
                            📋 Lista
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-600 border rounded hover:bg-gray-50">
                            🔄 Actualizar Calendario
                        </button>
                    </div>
                </div>

                {/* Selector de semana */}
                <div className="bg-green-200 p-4 rounded-lg mb-6 flex items-center justify-center gap-4">
                    <button onClick={() => cambiarSemana(-1)} className="text-gray-700 hover:text-gray-900">
                        ◀
                    </button>
                    <span className="font-semibold text-gray-900">Semana del 20 - 26 Enero 2025</span>
                    <button onClick={() => cambiarSemana(1)} className="text-gray-700 hover:text-gray-900">
                        ▶
                    </button>
                </div>

                {/* Vista de calendario */}
                {vistaActual === "calendario" && (
                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                        <div className="bg-white rounded-lg overflow-hidden">
                            {/* Tabla de horarios */}
                            <table className="w-full border-collapse">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2 text-sm font-semibold text-gray-700">Hora</th>
                                    {diasSemana.map((dia) => (
                                        <th key={dia.nombre} className="border p-2 text-sm font-semibold text-gray-700">
                                            {dia.nombre}
                                            <br />
                                            <span className="text-xs font-normal">{dia.numero}</span>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {horariosBase.map((hora) => (
                                    <tr key={hora}>
                                        <td className="border p-2 text-sm font-semibold text-gray-700 bg-gray-50">{hora}</td>
                                        {diasSemana.map((dia) => {
                                            const clase = obtenerClase(dia.nombre, hora)
                                            const esAlmuerzo = hora === "12:00 PM"

                                            if (esAlmuerzo) {
                                                return (
                                                    <td key={dia.nombre} className="border p-2 text-center bg-gray-100">
                                                        <span className="text-sm text-gray-600">Almuerzo</span>
                                                    </td>
                                                )
                                            }

                                            if (clase) {
                                                return (
                                                    <td key={dia.nombre} className="border p-3 bg-white">
                                                        <div className="text-sm">
                                                            <div className="font-semibold text-gray-900">{clase.materia}</div>
                                                            <div className="text-xs text-gray-600">{clase.hora}</div>
                                                            {filtros.mostrarProfesores && (
                                                                <div className="text-xs text-gray-500">{clase.profesor}</div>
                                                            )}
                                                        </div>
                                                    </td>
                                                )
                                            }

                                            return <td key={dia.nombre} className="border p-2 bg-gray-50"></td>
                                        })}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Botones de navegación */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => cambiarSemana(-1)}
                                className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100"
                            >
                                ← Semana Anterior
                            </button>
                            <button
                                onClick={() => cambiarSemana(1)}
                                className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100"
                            >
                                Semana Siguiente →
                            </button>
                        </div>
                    </div>
                )}

                {/* Vista de lista */}
                {vistaActual === "lista" && (
                    <div className="bg-green-100 p-6 rounded-lg mb-6">
                        <div className="space-y-4">
                            {Object.entries(horarioMock).map(([dia, clases]) => {
                                const clasesFiltradas = filtros.soloObligatorias
                                    ? clases.filter((c) => c.tipo === "obligatoria")
                                    : clases

                                if (clasesFiltradas.length === 0) return null

                                return (
                                    <div key={dia} className="bg-white p-4 rounded-lg">
                                        <h3 className="font-bold text-gray-900 mb-2 capitalize">{dia}</h3>
                                        <div className="space-y-2">
                                            {clasesFiltradas.map((clase, index) => (
                                                <div key={index} className="border-l-4 border-green-500 pl-3">
                                                    <div className="font-semibold text-gray-900">{clase.materia}</div>
                                                    <div className="text-sm text-gray-600">{clase.hora}</div>
                                                    {filtros.mostrarProfesores && <div className="text-sm text-gray-500">{clase.profesor}</div>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Filtros de visualización */}
                <div className="bg-white p-6 rounded-lg border">
                    <h3 className="font-bold text-gray-900 mb-4">Filtros de Visualización</h3>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filtros.mostrarProfesores}
                                onChange={() => toggleFiltro("mostrarProfesores")}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">Mostrar profesores</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filtros.horariosAMPM}
                                onChange={() => toggleFiltro("horariosAMPM")}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">Horarios AM/PM</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filtros.mostrarTodas}
                                onChange={() => toggleFiltro("mostrarTodas")}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">Mostrar todas las clases</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filtros.soloObligatorias}
                                onChange={() => toggleFiltro("soloObligatorias")}
                                className="w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">Solo clases obligatorias</span>
                        </label>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white p-4 mt-8">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Horario actualizado: 20 Enero 2025</span>
                    <div className="flex gap-6 text-sm">
                        <span>🟢 Clase programada</span>
                        <span>⚪ Horario libre</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default VerHorario
