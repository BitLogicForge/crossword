import { Box, TableCell } from "@mui/material";
import { SYMBOL } from "../constants/CApp";

type TProps = {
  letter: string;
};

export default function LetterCell({ letter }: TProps) {
  return (
    <TableCell sx={{ p: 0, m: 0, border: 0 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontWeight: "bold",
          fontSize: 18,

          borderRadius: 2,
          backgroundColor:
            letter === SYMBOL.EMPTY ? "secondary.main" : "primary.main",
          color: letter === SYMBOL.EMPTY ? "secondary.text" : "primary.text",

          margin: "2px",
        }}
      >
        {letter}
      </Box>
    </TableCell>
  );
}
