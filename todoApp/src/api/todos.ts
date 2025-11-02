import client from "./client";
import type { TodoType } from "../types/todo";

export async function getTodos(): Promise<TodoType[]> {
    const res = await client.get<TodoType[]>("/todos");
    return res.data;
}

export async function deleteTodo(id: string): Promise<void> {
    await client.delete(`/todos/${id}`);
}
