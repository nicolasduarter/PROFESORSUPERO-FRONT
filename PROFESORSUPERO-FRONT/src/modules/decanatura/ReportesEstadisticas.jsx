import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiArrowLeft, FiDownload, FiFilter, FiTrendingUp, FiTrendingDown } from "react-icons/fi"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Select from "../../components/ui/Select"

function ReportesEstadisticas() {
    const navigate = useNavigate()
    const [filtroTiempo, setFiltroTiempo] = useState("mes")
    const [filtroPrograma, setFiltroPrograma] = useState("todos")

    // Mock data - Historial de cambios por estudiante
    const historialEstudiantes = [
        {
            id: 1,
            nombre: "Juan Carlos Pérez",
            programa: "Ingeniería de Sistemas",
            totalSolicitudes: 5,
            aprobadas: 4,
            rechazadas: 1,
        },
        { id: 2, nombre: "Ana María López", programa: "Administración", totalSolicitudes: 3, aprobadas: 3, rechazadas: 0 },
        {
            id: 3,
            nombre: "Carlos Rodríguez",
            programa: "Ingeniería Industrial",
            totalSolicitudes: 4,
            aprobadas: 2,
            rechazadas: 2,
        },
        {
            id: 4,
            nombre: "María Fernanda García",
            programa: "Contaduría",
            totalSolicitudes: 2,
            aprobadas: 2,
            rechazadas: 0,
        },
        {
            id: 5,
            nombre: "Pedro Martínez",
            programa: "Ingeniería de Sistemas",
            totalSolicitudes: 6,
            aprobadas: 5,
            rechazadas: 1,
        },
    ]

    // Mock data - Grupos más solicitados
    const gruposSolicitados = [
        { grupo: "CALD4 - Cálculo Diferenicial", solicitudes: 45 },
        { grupo: "IPRO9 - Introducción a la Programación", solicitudes: 38 },
        { grupo: "PRYE1 C - Probabilidad y Estadística", solicitudes: 32 },
        { grupo: "FIEM12 - Física del Electromagnetismo", solicitudes: 28 },
        { grupo: "ALLI2 - Álgebra Lineal", solicitudes: 25 },
        { grupo: "REM5 - Resistencia de Materiales", solicitudes: 20 },
    ]

    // Mock data - Tasa de aprobación vs rechazo
    const tasaAprobacion = [
        { mes: "Enero", aprobadas: 65, rechazadas: 15 },
        { mes: "Febrero", aprobadas: 72, rechazadas: 18 },
        { mes: "Marzo", aprobadas: 58, rechazadas: 22 },
        { mes: "Abril", aprobadas: 80, rechazadas: 12 },
        { mes: "Mayo", aprobadas: 75, rechazadas: 15 },
        { mes: "Junio", aprobadas: 68, rechazadas: 20 },
    ]

    // Mock data - Distribución por tipo de solicitud
    const distribucionTipos = [
        { tipo: "Cambio de Grupo", valor: 45, color: "bg-emerald-500" },
        { tipo: "Cambio de Materia", valor: 35, color: "bg-blue-500" },
        { tipo: "Cancelación", valor: 20, color: "bg-amber-500" },
    ]

    // Mock data - Indicadores de avance
    const indicadoresAvance = [
        { programa: "Ingeniería de Sistemas", promedio: 85, enRiesgo: 12, destacados: 28 },
        { programa: "Administración de Empresas", promedio: 78, enRiesgo: 8, destacados: 15 },
        { programa: "Ingeniería Industrial", promedio: 82, enRiesgo: 10, destacados: 22 },
        { programa: "Economía", promedio: 80, enRiesgo: 6, destacados: 18 },
    ]

    // Mock data - Tendencia mensual de solicitudes
    const tendenciaMensual = [
        { mes: "Ene", total: 80 },
        { mes: "Feb", total: 90 },
        { mes: "Mar", total: 80 },
        { mes: "Abr", total: 92 },
        { mes: "May", total: 90 },
        { mes: "Jun", total: 88 },
    ]

    const exportarReporte = () => {
        alert("Funcionalidad de exportación en desarrollo. Se generará un PDF con todos los reportes.")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/dashboard/decano")}
                                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <FiArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold">Reportes y Estadísticas</h1>
                                <p className="text-gray-300 mt-1">Análisis detallado de solicitudes académicas</p>
                            </div>
                        </div>
                        <Button
                            onClick={exportarReporte}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                        >
                            <FiDownload className="w-5 h-5" />
                            Exportar Reporte
                        </Button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filtros */}
                <Card className="mb-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <FiFilter className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-700">Filtros:</span>
                        </div>
                        <Select value={filtroTiempo} onChange={(e) => setFiltroTiempo(e.target.value)} className="w-40">
                            <option value="semana">Última semana</option>
                            <option value="mes">Último mes</option>
                            <option value="trimestre">Último trimestre</option>
                            <option value="semestre">Último semestre</option>
                            <option value="año">Último año</option>
                        </Select>
                        <Select value={filtroPrograma} onChange={(e) => setFiltroPrograma(e.target.value)} className="w-48">
                            <option value="todos">Todos los programas</option>
                            <option value="sistemas">Ingeniería de Sistemas</option>
                            <option value="industrial">Ingeniería Industrial</option>
                            <option value="admin">Administración</option>
                            <option value="contaduria">Contaduría</option>
                        </Select>
                    </div>
                </Card>

                {/* Métricas Principales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                        <div className="text-center">
                            <p className="text-emerald-100 text-sm font-medium mb-2">Total Solicitudes</p>
                            <p className="text-4xl font-bold">528</p>
                            <div className="flex items-center justify-center gap-1 text-emerald-100 text-xs mt-2">
                                <FiTrendingUp className="w-4 h-4" />
                                <span>+12% vs mes anterior</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-center">
                            <p className="text-blue-100 text-sm font-medium mb-2">Tasa de Aprobación</p>
                            <p className="text-4xl font-bold">82%</p>
                            <div className="flex items-center justify-center gap-1 text-blue-100 text-xs mt-2">
                                <FiTrendingUp className="w-4 h-4" />
                                <span>+5% vs mes anterior</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                        <div className="text-center">
                            <p className="text-amber-100 text-sm font-medium mb-2">Tiempo Promedio</p>
                            <p className="text-4xl font-bold">2.5d</p>
                            <div className="flex items-center justify-center gap-1 text-amber-100 text-xs mt-2">
                                <FiTrendingDown className="w-4 h-4" />
                                <span>-0.3d vs mes anterior</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-center">
                            <p className="text-purple-100 text-sm font-medium mb-2">Pendientes</p>
                            <p className="text-4xl font-bold">12</p>
                            <div className="flex items-center justify-center gap-1 text-purple-100 text-xs mt-2">
                                <FiTrendingDown className="w-4 h-4" />
                                <span>-8 vs semana anterior</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Gráficos principales */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Tasa de Aprobación vs Rechazo */}
                    <Card className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Tasa de Aprobación vs Rechazo (Últimos 6 meses)</h3>
                        <div className="space-y-4">
                            {tasaAprobacion.map((data, index) => {
                                const total = data.aprobadas + data.rechazadas
                                const aprobadasPct = (data.aprobadas / total) * 100
                                const rechazadasPct = (data.rechazadas / total) * 100
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700 w-20">{data.mes}</span>
                                            <div className="flex-1 flex gap-1 h-8">
                                                <div
                                                    className="bg-emerald-500 rounded-l flex items-center justify-center text-white text-xs font-medium"
                                                    style={{ width: `${aprobadasPct}%` }}
                                                >
                                                    {data.aprobadas}
                                                </div>
                                                <div
                                                    className="bg-red-500 rounded-r flex items-center justify-center text-white text-xs font-medium"
                                                    style={{ width: `${rechazadasPct}%` }}
                                                >
                                                    {data.rechazadas}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                                <span className="text-sm text-gray-600">Aprobadas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-500 rounded"></div>
                                <span className="text-sm text-gray-600">Rechazadas</span>
                            </div>
                        </div>
                    </Card>

                    {/* Distribución por Tipo de Solicitud */}
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Distribución por Tipo de Solicitud</h3>
                        <div className="space-y-4">
                            {distribucionTipos.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.tipo}</span>
                                        <span className="text-sm font-bold text-gray-900">{item.valor}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`${item.color} h-3 rounded-full transition-all`}
                                            style={{ width: `${item.valor}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Tendencia Mensual */}
                    <Card>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Tendencia Mensual de Solicitudes</h3>
                        <div className="flex items-end justify-between h-48 gap-2">
                            {tendenciaMensual.map((data, index) => {
                                const height = (data.total / 100) * 100
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="relative w-full">
                                            <div
                                                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer"
                                                style={{ height: `${height}px` }}
                                            ></div>
                                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700">
                        {data.total}
                      </span>
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">{data.mes}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                </div>

                {/* Grupos Más Solicitados */}
                <Card className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Grupos Más Solicitados</h3>
                    <div className="space-y-3">
                        {gruposSolicitados.map((grupo, index) => {
                            const maxSolicitudes = 45
                            const width = (grupo.solicitudes / maxSolicitudes) * 100
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700 w-48">{grupo.grupo}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div
                                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-6 rounded-full flex items-center justify-end pr-3 transition-all"
                                            style={{ width: `${width}%` }}
                                        >
                                            <span className="text-xs font-bold text-white">{grupo.solicitudes}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>

                {/* Indicadores de Avance por Programa */}
                <Card className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Indicadores de Avance en Planes de Estudio</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Programa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Promedio General
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estudiantes en Riesgo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estudiantes Destacados
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {indicadoresAvance.map((indicador, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {indicador.programa}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        {indicador.promedio}%
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                        {indicador.enRiesgo} estudiantes
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {indicador.destacados} estudiantes
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Historial de Cambios por Estudiante */}
                <Card>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Cambios por Estudiante</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estudiante
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Programa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Solicitudes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aprobadas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rechazadas
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tasa de Éxito
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {historialEstudiantes.map((estudiante) => {
                                const tasaExito = ((estudiante.aprobadas / estudiante.totalSolicitudes) * 100).toFixed(0)
                                return (
                                    <tr key={estudiante.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {estudiante.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.programa}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {estudiante.totalSolicitudes}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-medium">
                                            {estudiante.aprobadas}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                                            {estudiante.rechazadas}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${tasaExito}%` }}></div>
                                                </div>
                                                <span className="text-xs font-medium">{tasaExito}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ReportesEstadisticas

