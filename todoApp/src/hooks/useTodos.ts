import { useCallback, useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import type { TodoType } from "../types/todo";

type UseTodosResult = {
    data: TodoType[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
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

    useEffect(() => {
        void fetch();
    }, [fetch]);

    return { data, loading, error, refetch: fetch };
}
