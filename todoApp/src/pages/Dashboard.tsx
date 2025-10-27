import { Box, Typography, Container, Paper, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";

type TodoType = {
  id: string;
  title: string;
  author: string;
  todoDate: string;
};

export default function Dashboard() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get<TodoType[]>("http://localhost:3000/todos");

        // id順に昇順ソート
        const sorted = res.data.sort((a, b) => a.id.localeCompare(b.id));

        setTodos(sorted);
      } catch (err) {
        console.error("❌ Failed to fetch todos", err);
      }
    };
    fetchTodos();
    setOpenSnackbar(true);
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete todo", err);
    }
  };


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
          <Typography variant="h4" align="center">
            ダッシュボード
          </Typography>

          <Typography variant="h6" align="center">
            TODO一覧
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              px: 2,
              py: 1,
              backgroundColor: "#eeeeee",
              borderRadius: 1,
            }}
          >
            <Typography sx={{ width: "30%" }}>日付</Typography>
            <Typography sx={{ width: "40%", textAlign: "center" }}>タイトル</Typography>
            <Typography sx={{ width: "30%", textAlign: "right" }}>作成者</Typography>
          </Box>

          {/* TODO一覧 */}
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              date={todo.todoDate}
              title={todo.title}
              author={todo.author}
              onDelete={() => handleDelete(todo.id)}
            />
          ))}
        </Box>
      </Paper>

      {/* ポップアップ通知 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          ログインに成功しました 🎉
        </Alert>
      </Snackbar>
    </Container>
  );
}
