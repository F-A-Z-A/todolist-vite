import type { FilterValues, Todolist } from "../App.tsx";
import { v1 } from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Todolist[] = [];

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case "delete_todolist": {
      const { id } = action.payload;
      return state.filter((todolist) => todolist.id !== id);
    }
    case "create_todolist": {
      const { id, title } = action.payload;
      const newTodolist: Todolist = { id, title, filter: "all" };
      return [newTodolist, ...state];
    }
    case "change_todolist_title": {
      const { id, title } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, title } : tl));
    }
    case "change_todolist_filter": {
      const { id, filter } = action.payload;
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl));
    }
    default:
      return state;
  }
};

export const deleteTodolistAC = (id: string) => {
  return { type: "delete_todolist", payload: { id } } as const;
};

export const createTodolistAC = (title: string) => {
  return { type: "create_todolist", payload: { id: v1(), title } } as const;
};

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "change_todolist_title", payload } as const;
};

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValues }) => {
  return { type: "change_todolist_filter", payload } as const;
};

type Actions =
  | ReturnType<typeof deleteTodolistAC>
  | ReturnType<typeof createTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>;
