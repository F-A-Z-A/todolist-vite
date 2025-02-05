import type {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
	title: string
	tasks: Task[]
	deleteTask: (id: number) => void
	changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: Props) => {
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button title={"+"}></Button>
			</div>
			{tasks.length === 0 ? <p>Тасок нет</p> :
				<ul>
					{tasks.map(t => {
							return (
								<li key={t.id}>
									<input type="checkbox" checked={t.isDone}/>
									<span>{t.title}</span>
									<Button title={"x"} onClick={() => deleteTask(t.id)}/>
								</li>
							)
						}
					)}
				</ul>
			}
			<div>
				<Button title={"All"} onClick={() => changeFilter("all")}></Button>
				<Button title={"Active"} onClick={() => changeFilter("active")}></Button>
				<Button title={"Completed"} onClick={() => changeFilter("completed")}></Button>
			</div>
		</div>
	);
};