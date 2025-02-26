import { instance } from "@/common/instance/instance.ts";
import type { Todolist } from "@/features/todolists/api/todolistsApi.types.ts";
import type { BaseResponse } from "@/common/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("todo-lists");
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("todo-lists", { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  },
};
