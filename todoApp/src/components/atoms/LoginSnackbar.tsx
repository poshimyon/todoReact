import { Snackbar, Alert } from "@mui/material";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function LoginSnackbar({ open, onClose }: Props) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert severity="success" sx={{ width: "100%" }}>
                ログインに成功しました 🎉
            </Alert>
        </Snackbar>
    );
}
