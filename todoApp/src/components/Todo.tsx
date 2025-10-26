// components/Todo.tsx
import { Box, Typography, Paper } from "@mui/material";

type TodoProps = {
  date: string;
  title: string;
  author: string;
};

export default function Todo({ date, title, author }: TodoProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        mb: 2,
        backgroundColor: "#f5f5f5",
        color: "#000",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ width: "30%" }}>
          {date}
        </Typography>
        <Typography variant="body1" sx={{ width: "40%", textAlign: "center", fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ width: "30%", textAlign: "right", color: "#555" }}>
          {author}
        </Typography>
      </Box>
    </Paper>
  );
}
