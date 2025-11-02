import { useState } from "react";
import Todo from "../molecules/Todo";
import { Box } from "@mui/material";
import type { TodoType } from "../../types/todo";
import ConfirmDialog from "../molecules/ConfirmDialog";

type Props = {
    todos: TodoType[];
    onDelete: (id: string) => Promise<void>;
};

export default function TodoList({ todos, onDelete }: Props) {
    const [targetTodo, setTargetTodo] = useState<TodoType | null>(null);
    const [updateTodo, setUpdateTodo] = useState<TodoType | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRequestDelete = (todo: TodoType) => {
        setTargetTodo(todo);
    };

    const handleRequestUpdate = (todo: TodoType) => {
        setUpdateTodo(todo);
    };

    const handleClose = () => {
        if (isDeleting) {
            return;
        }
        setTargetTodo(null);
    };

    const handleConfirmDelete = async () => {
        if (!targetTodo) {
            return;
        }
        setIsDeleting(true);
        try {
            await onDelete(targetTodo.id);
            setTargetTodo(null);
        } catch (err) {
            console.error(
                `Failed to delete todo with id ${targetTodo.id}`,
                err
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const handleConfirmEdit = async () => {
        if (!targetTodo) {
            return;
        }
        setIsDeleting(true);
        try {
            await onDelete(updateTodo.id);
            setTargetTodo(null);
        } catch (err) {
            console.error(
                `Failed to delete todo with id ${targetTodo.id}`,
                err
            );
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todoDate={todo.todoDate}
                        title={todo.title}
                        author={todo.author}
                        onDelete={() => {
                            handleRequestDelete(todo);
                        }}
                        onUpdate={() => {
                            handleRequestUpdate(todo);
                        }}
                    />
                ))}
            </Box>

            <ConfirmDialog
                open={Boolean(targetTodo)}
                title="TODOを削除しますか？"
                description={
                    targetTodo
                        ? `「${targetTodo.title}」を削除すると元に戻せません。`
                        : ""
                }
                confirmLabel="削除する"
                loading={isDeleting}
                onCancel={handleClose}
                onConfirm={() => {
                    void handleConfirmDelete();
                }}
            />
        </>
    );
}
