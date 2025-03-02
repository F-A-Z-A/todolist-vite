import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "./todolists-slice.ts"

const initialState: TasksState = {}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((task) => task.id === taskId)
      if (index !== -1) state[todolistId].splice(index, 1)
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const { todolistId, title } = action.payload
      const newTask: Task = { id: nanoid(), title, isDone: false }
      state[todolistId].unshift(newTask)
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const task = state[todolistId].find((task) => task.id === taskId)
      if (task) task.isDone = isDone
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const { todolistId, taskId, title } = action.payload
      const task = state[todolistId].find((task) => task.id === taskId)
      if (task) task.title = title
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const newTodolistId = action.payload.data.item
        state[newTodolistId.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

// types
export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type TasksState = Record<string, Task[]>
