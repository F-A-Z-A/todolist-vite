import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

const todolistId1 = v1();
const todolistId2 = v1();

export const App = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Rest API", isDone: true },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
  });

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) });
  };

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)));
  };

  const createTask = (todolistId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] });
  };

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, isDone } : t)) });
  };

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  return (
    <div className="app">
      {todolists.map((todolist) => {
        const getFilteredTasks = () => {
          let filteredTasks = tasks[todolist.id];
          if (todolist.filter === "active") {
            filteredTasks = filteredTasks.filter((task) => !task.isDone);
          }
          if (todolist.filter === "completed") {
            filteredTasks = filteredTasks.filter((task) => task.isDone);
          }
          return filteredTasks;
        };
        return (
          <TodolistItem
            key={todolist.id}
            todolist={todolist}
            tasks={getFilteredTasks()}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTaskStatus={changeTaskStatus}
            deleteTodolist={deleteTodolist}
          />
        );
      })}
    </div>
  );
};

// types
export type FilterValues = "all" | "active" | "completed";

export type Todolist = {
  id: string;
  title: string;
  filter: FilterValues;
};

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksState = Record<string, Task[]>;
