import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

// slice
export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((tl) => tl.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((tl) => {
          state.push({ ...tl, filter: "all" })
        })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        const newTodolist = action.payload.data.item
        state.unshift({ ...newTodolist, filter: "all" })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilterAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

// thunks
export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (e) {
    return thunkAPI.rejectWithValue(null)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (payload: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(payload)
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (payload: { title: string }, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(payload.title)
      return res.data
    } catch (e) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC `,
  async (payload: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(payload.id)
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue(null)
    }
  },
)

// types
export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export type FilterValues = "all" | "active" | "completed"
