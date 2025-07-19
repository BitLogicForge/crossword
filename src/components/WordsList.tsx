import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Chip } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion"; // <-- Add this
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
      <AnimatePresence>
        {words.map((word) => {
          const hasNoPlace: boolean = noPlace.some((np) => np.id === word.id);
          return (
            <motion.div
              key={word.id}
              layout
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{ display: "inline-block" }}
            >
              <Chip
                label={word.label}
                color={hasNoPlace ? "error" : "primary"}
                deleteIcon={<DeleteIcon />}
                onDelete={() => {
                  dispatch(removeWordFromList({ id: word.id }));
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
}
