import Todo from "../molecules/Todo";
import { Box } from "@mui/material";
import type { TodoType } from "../../types/todo";

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
