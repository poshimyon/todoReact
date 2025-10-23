import { Box, Typography, Container, Paper, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export default function Dashboard() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    setOpenSnackbar(true);
  }, []);

  const todos = [
    { date: "2025-10-23", title: "Reactの型定義を確認する", author: "たくみ" },
    { date: "2025-10-23", title: "Todo一覧の表示を実装する", author: "たかと" },
    { date: "2025-10-25", title: "API連携の設計を考える", author: "たくみ？" },
  ];

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
          {todos.map((todo, index) => (
            <Todo
              key={index}
              date={todo.date}
              title={todo.title}
              author={todo.author}
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
