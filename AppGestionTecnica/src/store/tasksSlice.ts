import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { initialTasks } from '../data/tasks';
import { TaskStatus, TechnicalTask } from '../types/task';
export type TasksState = { items: TechnicalTask[] };
export type NewTechnicalTask = Omit<TechnicalTask, 'id' | 'createdAt'>;
const initialState: TasksState = { items: initialTasks };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      prepare(task: NewTechnicalTask) {
        return { payload: {
          ...task,
          id: nanoid(),
          createdAt: new Date().toLocaleDateString(),
        } };
      },
      reducer(state, action: PayloadAction<TechnicalTask>) {
        state.items.unshift(action.payload);
      },
    },
    updateTaskStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
