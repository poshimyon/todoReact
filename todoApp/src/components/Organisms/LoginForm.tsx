import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Alert,
    Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("ユーザー名とパスワードを入力してください");
            return;
        }
        if (username === "user" && password === "password") {
            navigate("/dashboard");
        } else {
            setError("ユーザー名またはパスワードが違います");
        }
    };

    return (
        <Container
            component="main"
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: "100%",
                    maxWidth: 400,
                    backgroundColor: "#6e6c6cff", // 明るめのダークトーン
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
                    <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                        ログイン
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ width: "100%" }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="ユーザー名"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            slotProps={{
                                input: { sx: { color: "#fff" } },
                                inputLabel: { sx: { color: "#aaa" } },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="パスワード"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: { sx: { color: "#fff" } },
                                inputLabel: { sx: { color: "#aaa" } },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ログイン
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
