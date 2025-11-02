import client from "./client";
import type { TodoType, TodoUpdatePayload } from "../types/todo";

export async function getTodos(): Promise<TodoType[]> {
    const res = await client.get<TodoType[]>("/todos");
    return res.data;
}

export async function deleteTodo(id: string): Promise<void> {
    await client.delete(`/todos/${id}`);
}

export async function updateTodo(
    id: string,
    payload: TodoUpdatePayload
): Promise<TodoType> {
    const res = await client.put<TodoType>(`/todos/${id}`, payload);
    return res.data;
}
