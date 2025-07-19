import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../stores/hooks";
import { addWordToList } from "../stores/slices/crossSlice";

export default function WordAdd() {
  const dispatch = useAppDispatch();
  const [inputWord, setInputWord] = useState("");

  return (
    <Box display={"flex"} gap={2} mb={2}>
      <TextField
        label="New Word"
        sx={{ flex: 1 }}
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(addWordToList(inputWord));
          setInputWord("");
        }}
      >
        Add Word
      </Button>
    </Box>
  );
}
