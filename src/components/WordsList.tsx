import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { removeWordFromList } from "../stores/slices/crossSlice";
export default function WordsList() {
  const words = useAppSelector((state) => state.cross.words);
  const noPlace = useAppSelector((state) => state.cross.noPlace);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,

        width: "100%",
      }}
    >
      {words.map((word) => {
        const hasNoPlace: boolean = noPlace.some((np) => np.id === word.id);
        return (
          <Chip
            key={word.id}
            label={word.label}
            color={hasNoPlace ? "error" : "primary"}
            deleteIcon={<DeleteIcon />}
            onDelete={() => {
              dispatch(removeWordFromList({ id: word.id }));
            }}
          />
        );
      })}
    </Box>
  );
}
