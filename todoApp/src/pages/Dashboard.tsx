import { Box, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/atoms/DashboardHeader";
import TodoList from "../components/Organisms/TodoList";
import LoginSnackbar from "../components/atoms/LoginSnackbar";
import useTodos from "../hooks/useTodos";

export default function Dashboard() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { data: todos } = useTodos();

    useEffect(() => {
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
