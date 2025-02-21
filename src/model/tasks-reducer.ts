import type { TasksState } from "../app/App.tsx";
import { createTodolistAC, deleteTodolistAC } from "./todolists-reducer";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState: TasksState = {};

export const deleteTaskAC = createAction<{
  todolistId: string;
  taskId: string;
}>("tasks/deleteTasks");

export const createTaskAC = createAction<{
  todolistId: string;
  title: string;
}>("tasks/createTask");

export const changeTaskTitleAC = createAction<{
  todolistId: string;
  taskId: string;
  title: string;
}>("tasks/changeTaskTitle");

export const changeTaskStatusAC = createAction<{
  todolistId: string;
  taskId: string;
  isDone: boolean;
}>("tasks/changeTaskStatus");

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = [];
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.id];
    })
    .addCase(deleteTaskAC, (state, action) => {
      const { todolistId, taskId } = action.payload;
      const index = state[todolistId].findIndex((t) => t.id === taskId);
      if (index >= 0) state[todolistId].splice(index, 1);
    })
    .addCase(createTaskAC, (state, action) => {
      const { todolistId, title } = action.payload;
      state[todolistId].unshift({ title, isDone: false, id: nanoid() });
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { todolistId, taskId, title } = action.payload;
      const task = state[todolistId].find((t) => t.id === taskId);
      if (task) task.title = title;
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { todolistId, taskId, isDone } = action.payload;
      const task = state[todolistId].find((t) => t.id === taskId);
      if (task) task.isDone = isDone;
    });
});
