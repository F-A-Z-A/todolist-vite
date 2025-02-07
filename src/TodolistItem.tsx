import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task, Todolist } from "./App";
import { Button } from "./Button";

type Props = {
  todolist: Todolist;
  tasks: Task[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValues) => void;
  createTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
  deleteTodolist: (todolistId: string) => void;
};

export const TodolistItem = (props: Props) => {
  const {
    todolist: { id, title, filter },
    tasks,
    deleteTask,
    changeFilter,
    createTask,
    changeTaskStatus,
    deleteTodolist,
  } = props;

  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle !== "") {
      createTask(id, trimmedTitle);
    } else {
      setError("Title is required");
    }
    setTaskTitle("");
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
    setError(null);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") createTaskHandler();
  };

  const deleteTodolistHandler = () => {
    deleteTodolist(id);
  };

  return (
    <div>
      <div className="container">
        <h3>{title}</h3>
        <Button title={"x"} onClick={deleteTodolistHandler} />
      </div>
      <div>
        <input
          className={error ? "error" : undefined}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id);
            };
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(id, task.id, e.currentTarget.checked);
            };

            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                <span className={task.isDone ? "is-done" : undefined}>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === "all" ? "active-filter" : undefined}
          title={"All"}
          onClick={() => changeFilter(id, "all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : undefined}
          title={"Active"}
          onClick={() => changeFilter(id, "active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : undefined}
          title={"Completed"}
          onClick={() => changeFilter(id, "completed")}
        />
      </div>
    </div>
  );
};
