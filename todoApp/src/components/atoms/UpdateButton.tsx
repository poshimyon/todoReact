import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type UpdateButtonProps = {
    onClick: () => void;
};

export default function UpdateButton({ onClick }: UpdateButtonProps) {
    return (
        <IconButton onClick={onClick} aria-label="edit">
            <EditIcon />
        </IconButton>
    );
}
