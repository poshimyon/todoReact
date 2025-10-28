import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "../components/atoms/DashboardHeader";
import TodoList from "../components/molecules/TodoList";
import LoginSnackbar from "../components/atoms/LoginSnackbar";

type TodoType = {
    id: string;
    title: string;
    author: string;
    date: string;
};

export default function Dashboard() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get<TodoType[]>(
                    "http://localhost:3000/todos"
                );

                // id順に昇順ソート
                const sorted = res.data.sort((a, b) =>
                    a.id.localeCompare(b.id)
                );

                setTodos(sorted);
            } catch (err) {
                console.error("❌ Failed to fetch todos", err);
            }
        };
        fetchTodos();
        setOpenSnackbar(true);
    }, []);

    return (
        <Container
            maxWidth={false}
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#b5b4b4ff",
                padding: 4,
                boxSizing: "border-box",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    padding: 4,
                    boxSizing: "border-box",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <DashboardHeader />

                    {/* TODO一覧 */}
                    <TodoList todos={todos} />
                </Box>
            </Paper>

            <LoginSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
            />
        </Container>
    );
}
