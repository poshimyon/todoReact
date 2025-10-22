import { Box, Typography, Container, Paper } from "@mui/material";

export default function Dashboard() {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#6e6c6cff", // ログイン画面と同じ背景色
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 500,
                    width: "100%",
                    backgroundColor: "#424242", // 少し濃いダークグレー
                    color: "#fff",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        ダッシュボード
                    </Typography>
                    <Typography variant="body1">
                        ログインに成功しました 🎉
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}