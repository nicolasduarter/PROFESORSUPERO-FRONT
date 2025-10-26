import api from '../api/axiosConfig';

const solicitudService = {
    // Obtener todas las solicitudes de un estudiante
    obtenerSolicitudesPorEstudiante: async (estudianteId) => {
        try {
            const response = await api.get(`/api/solicitudes/estudiante/${estudianteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    },

    // Crear solicitud de cambio de grupo
    crearSolicitudCambioGrupo: async (solicitudData) => {
        try {
            const response = await api.post('/api/solicitudes/cambio-grupo', solicitudData);
            return response.data;
        } catch (error) {
            console.error('Error al crear solicitud de cambio de grupo:', error);
            throw error;
        }
    },

    // Crear solicitud de cambio de materia
    crearSolicitudCambioMateria: async (solicitudData) => {
        try {
            const response = await api.post('/api/solicitudes/cambio-materia', solicitudData);
            return response.data;
        } catch (error) {
            console.error('Error al crear solicitud de cambio de materia:', error);
            throw error;
        }
    },

    // Obtener solicitud por ID
    obtenerSolicitudPorId: async (solicitudId) => {
        try {
            const response = await api.get(`/api/solicitudes/${solicitudId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener solicitud:', error);
            throw error;
        }
    },
};

export default solicitudService;