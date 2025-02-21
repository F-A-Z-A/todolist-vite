import type { FilterValues, Todolist } from "../app/App.tsx";
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

const initialState: Todolist[] = [];

export const deleteTodolistAC = createAction<{
  id: string;
}>("todolists/deleteTodolist");

export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
  return { payload: { title, id: nanoid() } };
});

export const changeTodolistTitleAC = createAction<{
  id: string;
  title: string;
}>("todolists/changeTodolistTitle");

export const changeTodolistFilterAC = createAction<{
  id: string;
  filter: FilterValues;
}>("todolists/changeTodolistFilter");

export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index >= 0) state.splice(index, 1);
    })
    .addCase(createTodolistAC, (state, action) => {
      state.unshift({ ...action.payload, filter: "all" });
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const { id, title } = action.payload;
      const todolist = state.find((tl) => tl.id === id);
      if (todolist) todolist.title = title;
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const { id, filter } = action.payload;
      const todolist = state.find((tl) => tl.id === id);
      if (todolist) todolist.filter = filter;
    });
});
