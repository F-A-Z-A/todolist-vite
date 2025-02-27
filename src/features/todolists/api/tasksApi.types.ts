import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type DomainTask = UpdateTaskModel & {
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: number
  startDate: TaskPriority
  deadline: string
}
