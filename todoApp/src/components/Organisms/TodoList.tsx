import { useState } from "react";
import { Box } from "@mui/material";
import Todo from "../molecules/Todo";
import ConfirmDialog from "../molecules/ConfirmDialog";
import TodoFormDialog from "../molecules/EditTodoDialog";
import type { TodoType, TodoUpdatePayload } from "../../types/todo";

type Props = {
    todos: TodoType[];
    onDelete: (id: string) => Promise<void>;
    onEdit: (id: string, payload: TodoUpdatePayload) => Promise<void>;
};

export default function TodoList({ todos, onDelete, onEdit }: Props) {
    const [deletingTodo, setDeletingTodo] = useState<TodoType | null>(null);
    const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleRequestDelete = (todo: TodoType) => {
        setDeletingTodo(todo);
    };

    const handleDeleteCancel = () => {
        if (isDeleting) {
            return;
        }
        setDeletingTodo(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingTodo) {
            return;
        }
        setIsDeleting(true);
        try {
            await onDelete(deletingTodo.id);
            setDeletingTodo(null);
        } catch (err) {
            console.error(
                `Failed to delete todo with id ${deletingTodo.id}`,
                err
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const handleRequestEdit = (todo: TodoType) => {
        setEditingTodo(todo);
    };

    const handleEditCancel = () => {
        if (isSaving) {
            return;
        }
        setEditingTodo(null);
    };

    const handleEditSave = async (values: TodoUpdatePayload) => {
        if (!editingTodo) {
            return;
        }
        setIsSaving(true);
        try {
            await onEdit(editingTodo.id, values);
            setEditingTodo(null);
        } catch (err) {
            console.error(
                `Failed to update todo with id ${editingTodo.id}`,
                err
            );
        } finally {
            setIsSaving(false);
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
                            handleRequestEdit(todo);
                        }}
                    />
                ))}
            </Box>

            <ConfirmDialog
                open={Boolean(deletingTodo)}
                title="TODOを削除しますか？"
                description={
                    deletingTodo
                        ? `「${deletingTodo.title}」を削除すると元に戻せません。`
                        : ""
                }
                confirmLabel="削除する"
                loading={isDeleting}
                onCancel={handleDeleteCancel}
                onConfirm={() => {
                    void handleDeleteConfirm();
                }}
            />

            <TodoFormDialog
                open={Boolean(editingTodo)}
                initialValues={
                    editingTodo
                        ? {
                              title: editingTodo.title,
                              author: editingTodo.author,
                              todoDate: editingTodo.todoDate,
                          }
                        : null
                }
                loading={isSaving}
                onCancel={handleEditCancel}
                onSave={(values) => {
                    void handleEditSave(values);
                }}
            />
        </>
    );
}
