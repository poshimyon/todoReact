import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
};

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "OK",
    cancelLabel = "キャンセル",
    loading = false,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            {description ? (
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
            ) : null}
            <DialogActions>
                <Button onClick={onCancel} disabled={loading}>
                    {cancelLabel}
                </Button>
                <Button
                    onClick={() => {
                        void onConfirm();
                    }}
                    color="error"
                    autoFocus
                    disabled={loading}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
