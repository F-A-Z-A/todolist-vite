import type {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
	title: string
	tasks: Task[]
}

export const TodolistItem = ({title, tasks}: Props) => {
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
								</li>
							)
						}
					)}
				</ul>
			}
			<div>
				<Button title={"All"}></Button>
				<Button title={"Active"}></Button>
				<Button title={"Completed"}></Button>
			</div>
		</div>
	);
};