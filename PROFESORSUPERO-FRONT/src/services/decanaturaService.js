import api from '../api/axiosConfig'

const decanaturaService = {

    obtenerDecanoPorId: async (id) => {
        try {
            const response = await api.get(`/decanatura/${id}`)
            return response.data
        } catch (error) {
            console.error('Error al obtener el decano por ID:', error)
            throw error
        }
    },


    obtenerSolicitudesPorFacultad: async (facultadId) => {
        try {
            const response = await api.get(`/decanatura/solicitudes/facultad/${facultadId}`)
            return response.data
        } catch (error) {
            console.error('Error al obtener las solicitudes de la facultad:', error)
            throw error
        }
    },

    cambiarEstadoSolicitud: async (solicitudId, estado) => {
        try {
            const response = await api.patch(
                `/decanatura/solicitudes/${solicitudId}/estado`,
                null,
                { params: { estado } }
            )
            return response.data
        } catch (error) {
            console.error("Error al cambiar el estado de la solicitud:", error)
            throw error
        }
    },


    obtenerEstudiantePorId: async (estudianteId) => {
        try {
            const response = await api.get(`/decanatura/estudiantes/${estudianteId}`)
            return response.data
        } catch (error) {
            console.error('Error al obtener información del estudiante:', error)
            throw error
        }
    },

}

export default decanaturaService
