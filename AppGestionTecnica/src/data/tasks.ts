import { TechnicalTask } from '../types/task';

export const initialTasks: TechnicalTask[] = [
    {
        id: '1',
        title: 'Revisar servidor de archivos',
        description: 'Validar espacio disponible y funcionamiento de los respaldos.',
        responsible: 'Alejandro Andino',
        contactPhone: '9999-1111',
        priority: 'Alta',
        status: 'Pendiente',
        shift: 'Mañana',
        createdAt: '30/08/2026',
    },
    {
        id: '2',
        title: 'Actualizar equipo de soporte',
        description: 'Instalar actualizaciones pendientes del sistema operativo.',
        responsible: 'Carlos Martínez',
        contactPhone: '9999-2222',
        priority: 'Media',
        status: 'En proceso',
        shift: 'Tarde',
        createdAt: '30/08/2026',
    },
    {
        id: '3',
        title: 'Verificar copias de seguridad',
        description: 'Comprobar la ejecución y restauración del respaldo semanal.',
        responsible: 'María López',
        contactPhone: '9999-3333',
        priority: 'Crítica',
        status: 'Completado',
        shift: 'Noche',
        createdAt: '29/08/2026',
    },
];