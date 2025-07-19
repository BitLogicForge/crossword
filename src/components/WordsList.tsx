import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { removeWordFromList } from "../stores/slices/crossSlice";
export default function WordsList() {
  const words = useAppSelector((state) => state.cross.words);
  const dispatch = useAppDispatch();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {words.map((word) => (
        <Chip
          key={word.id}
          label={word.label}
          color="primary"
          deleteIcon={<DeleteIcon />}
          onDelete={() => {
            dispatch(removeWordFromList({ id: word.id }));
          }}
        />
      ))}
    </Box>
  );
}
