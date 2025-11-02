import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import type { TodoPayload } from "../../types/todo";

type TodoFormDialogProps = {
    open: boolean;
    initialValues: TodoPayload | null;
    loading?: boolean;
    dialogTitle?: string;
    submitLabel?: string;
    onCancel: () => void;
    onSave: (values: TodoPayload) => void;
};

const emptyValues: TodoPayload = {
    title: "",
    author: "",
    todoDate: "",
};

export default function TodoFormDialog({
    open,
    initialValues,
    loading = false,
    dialogTitle = "TODOを編集",
    submitLabel = "保存する",
    onCancel,
    onSave,
}: TodoFormDialogProps) {
    const [values, setValues] = useState<TodoPayload>(emptyValues);

    const canSubmit = useMemo(() => {
        return values.title.trim().length > 0 && values.todoDate.trim().length > 0;
    }, [values]);

    useEffect(() => {
        if (open && initialValues) {
            setValues(initialValues);
        } else if (!open) {
            setValues(emptyValues);
        }
    }, [open, initialValues]);

    const handleChange =
        (field: keyof TodoPayload) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setValues((prev) => ({ ...prev, [field]: value }));
        };

    const handleSave = () => {
        if (!canSubmit || loading) {
            return;
        }
        onSave(values);
    };

    return (
        <Dialog open={open} onClose={loading ? undefined : onCancel} fullWidth>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="タイトル"
                        value={values.title}
                        onChange={handleChange("title")}
                        disabled={loading}
                        autoFocus
                        required
                    />
                    <TextField
                        label="担当者"
                        value={values.author}
                        onChange={handleChange("author")}
                        disabled={loading}
                    />
                    <TextField
                        label="日付"
                        type="date"
                        value={values.todoDate}
                        onChange={handleChange("todoDate")}
                        disabled={loading}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} disabled={loading}>
                    キャンセル
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={loading || !canSubmit}
                    variant="contained"
                >
                    {submitLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
