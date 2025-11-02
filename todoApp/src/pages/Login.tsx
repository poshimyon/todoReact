import { Box } from "@mui/material";
import LoginForm from "../components/Organisms/LoginForm";

export default function Login() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#1e1e1e", // 🌙 暗めの背景色
            }}
        >
            <LoginForm />
        </Box>
    );
}
