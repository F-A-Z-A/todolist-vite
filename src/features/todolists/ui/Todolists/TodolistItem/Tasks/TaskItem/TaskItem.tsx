import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC,
  type Task,
} from "@/features/todolists/model/tasks-reducer.ts";
import type { ChangeEvent } from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts";

type Props = {
  todolistId: string;
  task: Task;
};

export const TaskItem = ({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch();

  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }));
  };

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: newStatusValue }));
  };

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>
      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
