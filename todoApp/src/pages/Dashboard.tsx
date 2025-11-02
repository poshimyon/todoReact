import { Box, Button, Container, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/atoms/DashboardHeader";
import TodoList from "../components/Organisms/TodoList";
import LoginSnackbar from "../components/atoms/LoginSnackbar";
import useTodos from "../hooks/useTodos";
import TodoFormDialog from "../components/molecules/EditTodoDialog";
import type { TodoPayload } from "../types/todo";

export default function Dashboard() {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const {
        data: todos,
        remove: removeTodo,
        edit: editTodo,
        create: createTodo,
    } = useTodos();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createDefaults, setCreateDefaults] = useState<TodoPayload | null>(
        null
    );

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

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                setCreateDefaults({
                                    title: "",
                                    author: "",
                                    todoDate: new Date().toISOString().slice(0, 10),
                                });
                                setIsCreateOpen(true);
                            }}
                        >
                            TODOを追加
                        </Button>
                    </Box>

                    {/* TODO一覧 */}
                    <TodoList
                        todos={todos}
                        onDelete={removeTodo}
                        onEdit={editTodo}
                    />
                </Box>
            </Paper>

            <LoginSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
            />

            <TodoFormDialog
                open={isCreateOpen}
                initialValues={createDefaults}
                dialogTitle="TODOを追加"
                submitLabel="追加する"
                loading={isCreating}
                onCancel={() => {
                    if (isCreating) {
                        return;
                    }
                    setIsCreateOpen(false);
                    setCreateDefaults(null);
                }}
                onSave={(values) => {
                    setIsCreating(true);
                    void createTodo(values)
                        .then(() => {
                            setIsCreateOpen(false);
                            setCreateDefaults(null);
                        })
                        .catch((err) => {
                            console.error("Failed to create todo", err);
                        })
                        .finally(() => {
                            setIsCreating(false);
                        });
                }}
            />
        </Container>
    );
}
