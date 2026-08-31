import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

import { initialTasks } from '../data/tasks';
import {
    TaskStatus,
    TechnicalTask,
} from '../types/task';

type NewTechnicalTask = Omit<
    TechnicalTask,
    'id' | 'createdAt'
>;

type TaskContextType = {
    tasks: TechnicalTask[];
    addTask: (task: NewTechnicalTask) => void;
    updateTaskStatus: (
        id: string,
        status: TaskStatus
    ) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
    undefined
);

type TaskProviderProps = {
    children: ReactNode;
};

export function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] =
        useState<TechnicalTask[]>(initialTasks);

    function addTask(task: NewTechnicalTask) {
        const newTask: TechnicalTask = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date().toLocaleDateString(),
        };

        setTasks((currentTasks) => [
            newTask,
            ...currentTasks,
        ]);
    }

    function updateTaskStatus(
        id: string,
        status: TaskStatus
    ) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, status }
                    : task
            )
        );
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTaskStatus,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error(
            'useTasks debe utilizarse dentro de TaskProvider'
        );
    }

    return context;
}