import List from "@mui/material/List";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { selectTasks } from "@/features/todolists/model/tasks-selectors.ts";
import type { Todolist } from "@/features/todolists/model/todolists-reducer.ts";
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
  todolist: Todolist;
};

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const tasks = useAppSelector(selectTasks)[id];

  const getTasks = () => {
    let filteredTasks = tasks;
    if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.isDone);
    }
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.isDone);
    }
    return filteredTasks;
  };

  return (
    <>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {getTasks().map((task) => {
            return <TaskItem key={task.id} task={task} todolistId={id} />;
          })}
        </List>
      )}
    </>
  );
};
