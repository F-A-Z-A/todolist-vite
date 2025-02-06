import type {FilterValues, Task} from './App'
import {Button} from './Button'
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
	title: string
	tasks: Task[]
	deleteTask: (taskId: string) => void
	changeFilter: (filter: FilterValues) => void
	createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {
	const [taskTitle, setTaskTitle] = useState("")
	
	const createTaskHandler = () => {
		const newTask = taskTitle.trim()
		if (newTask) {
			createTask(newTask)
		}
		setTaskTitle("")
	}
	
	const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
	}
	
	const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			createTaskHandler()
		}
	}
	
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyDown={createTaskOnEnterHandler}/>
				<Button
					title={'+'}
					onClick={createTaskHandler}/>
			</div>
			{tasks.length === 0 ? (
				<p>Тасок нет</p>
			) : (
				<ul>
					{tasks.map(task => {
						const deleteTaskHandler = () => {
							deleteTask(task.id)
						}
						return (
							<li key={task.id}>
								<input type="checkbox" checked={task.isDone}/>
								<span>{task.title}</span>
								<Button
									title={'x'}
									onClick={deleteTaskHandler}/>
							</li>
						)
					})}
				</ul>
			)}
			<div>
				<Button title={'All'} onClick={() => changeFilter('all')}/>
				<Button title={'Active'} onClick={() => changeFilter('active')}/>
				<Button title={'Completed'} onClick={() => changeFilter('completed')}/>
			</div>
		</div>
	)
}
