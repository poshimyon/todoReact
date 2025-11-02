import { useCallback, useEffect, useState } from "react";
import { deleteTodo as deleteTodoApi, getTodos } from "../api/todos";
import type { TodoType } from "../types/todo";

type UseTodosResult = {
    data: TodoType[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    remove: (id: string) => Promise<void>;
};

export default function useTodos(): UseTodosResult {
    const [data, setData] = useState<TodoType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const todos = await getTodos();
            // id順に昇順ソートして保存
            const sorted = todos.sort((a, b) => a.id.localeCompare(b.id));
            setData(sorted);
        } catch (err: unknown) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    }, []);

    const remove = useCallback(async (id: string) => {
        setError(null);
        try {
            await deleteTodoApi(id);
            setData((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err: unknown) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            throw error;
        }
    }, []);

    const edit = useCallback(async (id: string, title: string) => {
        setError(null);
        try {
            // TODO：ここの編集APIを呼び出す処理を追加
            await editTodoApi(id, title);
            // TODO：ここに値を更新する処理を追加
        } catch (err: unknown) {
            const error = err instanceof Error ? err : new Error(String(err));
            setError(error);
            throw error;
        }
    }, []);

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { data, loading, error, refetch: fetch, remove };
}
