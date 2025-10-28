import Todo from "../atoms/Todo";
import { Box } from "@mui/material";

type TodoType = {
    id: string;
    title: string;
    author: string;
    date: string;
};

type Props = {
    todos: TodoType[];
};

export default function TodoList({ todos }: Props) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    date={todo.date}
                    title={todo.title}
                    author={todo.author}
                />
            ))}
        </Box>
    );
}
