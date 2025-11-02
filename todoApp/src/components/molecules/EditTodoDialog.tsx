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
import type { TodoUpdatePayload } from "../../types/todo";

type EditTodoDialogProps = {
    open: boolean;
    initialValues: TodoUpdatePayload | null;
    loading?: boolean;
    onCancel: () => void;
    onSave: (values: TodoUpdatePayload) => void;
};

const emptyValues: TodoUpdatePayload = {
    title: "",
    author: "",
    todoDate: "",
};

export default function EditTodoDialog({
    open,
    initialValues,
    loading = false,
    onCancel,
    onSave,
}: EditTodoDialogProps) {
    const [values, setValues] = useState<TodoUpdatePayload>(emptyValues);

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
        (field: keyof TodoUpdatePayload) =>
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
            <DialogTitle>TODOを編集</DialogTitle>
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
                        InputLabelProps={{
                            shrink: true,
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
                    保存する
                </Button>
            </DialogActions>
        </Dialog>
    );
}
