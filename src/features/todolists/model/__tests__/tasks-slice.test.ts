import { beforeEach, expect, test } from "vitest"
import { TaskPriority, TaskStatus } from "@/common/enums"
import type { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { changeTaskTC, createTaskTC, deleteTaskTC, tasksReducer } from "@/features/todolists/model/tasks-slice.ts"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { nanoid } from "@reduxjs/toolkit"

let startState: Record<string, DomainTask[]> = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", status: TaskStatus.New, todoListId: "todolistId1", ...taskDefaultValues },
      { id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", ...taskDefaultValues },
      { id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", ...taskDefaultValues },
    ],
    todolistId2: [
      { id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "2", title: "milk", status: TaskStatus.Completed, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues },
    ],
  }
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: "todolistId1", taskId: "1" }, "deleteTask", {
      todolistId: "todolistId1",
      taskId: "1",
    }),
  )

  expect(endState).toEqual({
    todolistId1: [
      { id: "2", title: "JS", status: TaskStatus.Completed, todoListId: "todolistId1", ...taskDefaultValues },
      { id: "3", title: "React", status: TaskStatus.New, todoListId: "todolistId1", ...taskDefaultValues },
    ],
    todolistId2: [
      { id: "1", title: "bread", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "2", title: "milk", status: TaskStatus.Completed, todoListId: "todolistId2", ...taskDefaultValues },
      { id: "3", title: "tea", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const newTask = { id: "4", title: "newTask", status: TaskStatus.New, todoListId: "todolistId2", ...taskDefaultValues }
  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled({ task: newTask }, "createTask", { todolistId: "todolistId2", title: "juice" }),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBeDefined()
  expect(endState.todolistId2[0].title).toBe("newTask")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const updateTask = { ...startState.todolistId1[0], ...taskDefaultValues, status: TaskStatus.Completed }
  const endState = tasksReducer(
    startState,
    changeTaskTC.fulfilled({ task: updateTask }, "changeTaskStatus", updateTask),
  )

  expect(startState.todolistId2[0].status).toBe(TaskStatus.New)
  expect(endState.todolistId1[0].status).toBe(TaskStatus.Completed)
})

test("correct task should change its title", () => {
  const updateTask = { ...startState.todolistId1[0], ...taskDefaultValues, title: "NewTaskTitle" }
  const endState = tasksReducer(
    startState,
    changeTaskTC.fulfilled({ task: updateTask }, "changeTaskStatus", updateTask),
  )

  expect(startState.todolistId1[0].title).toBe("CSS")
  expect(endState.todolistId1[0].title).toBe("NewTaskTitle")
})

test("array should be created for new todolist", () => {
  const title = "New todolist"
  const endState = tasksReducer(
    startState,
    createTodolistTC.fulfilled({ todolist: { id: nanoid(), title, addedDate: "", order: 0 } }, "createTodolist", title),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  // const endState = tasksReducer(startState, deleteTodolistTC({ id: "todolistId2" }))
  const endState = tasksReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: "todolistId1" }, "deleteTodolist", "todolistId1"),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId1"]).not.toBeDefined()
  // or
  expect(endState["todolistId1"]).toBeUndefined()
})
