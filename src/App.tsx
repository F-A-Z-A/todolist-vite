import './App.css'
import {useState} from 'react'
import {TodolistItem} from './TodolistItem'
import {v1} from "uuid";

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
	const [filter, setFilter] = useState<FilterValues>('all')
	
	const [tasks, setTasks] = useState<Task[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])
	
	const deleteTask = (taskId: string) => {
		const filteredTasks = tasks.filter(task => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}
	
	const changeFilter = (filter: FilterValues) => {
		setFilter(filter)
	}
	
	let filteredTasks = tasks
	if (filter === 'active') {
		filteredTasks = tasks.filter(task => !task.isDone)
	}
	if (filter === 'completed') {
		filteredTasks = tasks.filter(task => task.isDone)
	}
	
	const createTask = (title: string) => {
		setTasks([{id: v1(), title, isDone: false}, ...tasks])
	}
	
	return (
		<div className="app">
			<TodolistItem title="What to learn"
			              tasks={filteredTasks}
			              deleteTask={deleteTask}
			              changeFilter={changeFilter}
			              createTask={createTask}
			/>
		</div>
	)
}
