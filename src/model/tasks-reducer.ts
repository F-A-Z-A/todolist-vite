import type { TasksState } from "../App";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer.ts";
import { v1 } from "uuid";

const initialState: TasksState = {};

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
  switch (action.type) {
    case "create_todolist": {
      const { id } = action.payload;
      return { ...state, [id]: [] };
    }
    case "delete_todolist": {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case "delete_task": {
      const { todolistId, taskId } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter((t) => t.id !== taskId) };
    }
    case "create_task": {
      const { todolistId, taskId, title } = action.payload;
      return { ...state, [todolistId]: [{ id: taskId, title, isDone: false }, ...state[todolistId]] };
    }
    case "change_task_status": {
      const { todolistId, taskId, isDone } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, isDone } : t)) };
    }
    case "change_task_title": {
      const { todolistId, taskId, title } = action.payload;
      return { ...state, [todolistId]: state[todolistId].map((t) => (t.id === taskId ? { ...t, title } : t)) };
    }
    default:
      return state;
  }
};

export const deleteTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "delete_task", payload } as const;
};

export const createTaskAC = (payload: { todolistId: string; title: string }) => {
  return { type: "create_task", payload: { ...payload, taskId: v1() } } as const;
};

export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; isDone: boolean }) => {
  return { type: "change_task_status", payload } as const;
};

export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) => {
  return { type: "change_task_title", payload } as const;
};

type Actions =
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>;
