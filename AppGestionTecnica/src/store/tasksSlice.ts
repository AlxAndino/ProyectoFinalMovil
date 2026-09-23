import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { supabase } from '../lib/supabase';
import { TaskPriority, TaskStatus, TechnicalTask, WorkShift } from '../types/task';

export type TasksState = {
  items: TechnicalTask[];
  loading: boolean;
  error: string | null;
};

export type NewTechnicalTask = Omit<TechnicalTask, 'id' | 'createdAt'>;

type TaskRow = {
  id: string;
  title: string;
  description: string;
  responsible: string;
  contact_phone: string;
  priority: TaskPriority;
  status: TaskStatus;
  shift: WorkShift;
  created_at: string;
};

function mapTask(row: TaskRow): TechnicalTask {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    responsible: row.responsible,
    contactPhone: row.contact_phone,
    priority: row.priority,
    status: row.status,
    shift: row.shift,
    createdAt: new Date(row.created_at).toLocaleDateString('es-HN'),
  };
}

async function getUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error('No hay una sesión activa.');
  return data.user.id;
}

export const fetchTasks = createAsyncThunk<TechnicalTask[], void, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('technical_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as TaskRow[]).map(mapTask);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'No se pudieron cargar los pendientes.');
    }
  },
);

export const createTask = createAsyncThunk<TechnicalTask, NewTechnicalTask, { rejectValue: string }>(
  'tasks/createTask',
  async (task, { rejectWithValue }) => {
    try {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from('technical_tasks')
        .insert({
          user_id: userId,
          title: task.title,
          description: task.description,
          responsible: task.responsible,
          contact_phone: task.contactPhone,
          priority: task.priority,
          status: task.status,
          shift: task.shift,
        })
        .select()
        .single();

      if (error) throw error;
      return mapTask(data as TaskRow);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'No se pudo guardar el pendiente.');
    }
  },
);

export const changeTaskStatus = createAsyncThunk<
  { id: string; status: TaskStatus },
  { id: string; status: TaskStatus },
  { rejectValue: string }
>('tasks/changeTaskStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const { error } = await supabase
      .from('technical_tasks')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return { id, status };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'No se pudo actualizar el estado.');
  }
});

const initialState: TasksState = { items: [], loading: false, error: null };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'No se pudieron cargar los pendientes.';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const task = state.items.find((item) => item.id === action.payload.id);
        if (task) task.status = action.payload.status;
      });
  },
});

export default tasksSlice.reducer;
