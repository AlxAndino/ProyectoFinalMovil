export type TaskStatus =
    | 'Pendiente'
    | 'En proceso'
    | 'Completado';

export type TaskPriority =
    | 'Baja'
    | 'Media'
    | 'Alta'
    | 'Crítica';

export type WorkShift =
    | 'Mañana'
    | 'Tarde'
    | 'Noche';

export type TechnicalTask = {
    id: string;
    title: string;
    description: string;
    responsible: string;
    contactPhone: string;
    priority: TaskPriority;
    status: TaskStatus;
    shift: WorkShift;
    createdAt: string;
};