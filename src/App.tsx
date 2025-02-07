import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };
  const changaTaskStatus = (taskId: string, isDone: boolean) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, isDone } : t)));
  };

  const getFilteredTasks = () => {
    let filteredTasks = tasks;
    if (filter === "active") filteredTasks = tasks.filter((task) => !task.isDone);
    if (filter === "completed") filteredTasks = tasks.filter((task) => task.isDone);
    return filteredTasks;
  };

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={getFilteredTasks()}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changaTaskStatus={changaTaskStatus}
        filter={filter}
      />
    </div>
  );
};
