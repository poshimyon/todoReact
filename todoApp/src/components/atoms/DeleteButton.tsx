import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteButtonProps = {
  onClick: () => void;
};

export default function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <IconButton onClick={onClick} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
}
