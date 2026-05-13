import api from '../api/axiosConfig';

const claseService = {
    // Obtener todas las clases de un estudiante
    obtenerClasesPorEstudiante: async (estudianteId) => {
        try {
            const response = await api.get(`/api/clases/estudiante/${estudianteId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener clases:', error);
            throw error;
        }
    },

    // Obtener horario de un estudiante
    obtenerHorarioPorEstudiante: async (estudianteId) => {
        try {
            const response = await api.get(`/api/clases/estudiante/${estudianteId}/horario`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener horario:', error);
            throw error;
        }
    },
};

export default claseService;