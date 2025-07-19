import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../stores/hooks";
import { addWordToList } from "../stores/slices/crossSlice";

export default function WordAdd() {
  const dispatch = useAppDispatch();
  const [inputWord, setInputWord] = useState("");
  const { t } = useTranslation();

  return (
    <Box
      display={"flex"}
      gap={2}
      mb={2}
      sx={{
        flexDirection: { xs: "column", sm: "row" }, // stack on xs, row on sm+
        alignItems: { xs: "stretch", sm: "center" },
      }}
    >
      <TextField
        label={t("labels.newWord")}
        sx={{ flex: 1 }}
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(addWordToList(inputWord));
            setInputWord("");
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(addWordToList(inputWord));
          setInputWord("");
        }}
      >
        {t("labels.addWord")}
      </Button>
    </Box>
  );
}
