import { Box, TableCell } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { SYMBOL } from "../constants/CApp";

type TProps = {
  letter: string;
};

export default function LetterCell({ letter }: TProps) {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <TableCell sx={{ p: 0, m: 0, border: 0 }}>
      <Box
        component={motion.div}
        key={letter}
        initial={{ scale: 1, opacity: 0 }}
        animate={{
          scale: [1, 0.7, 0.2, 1],
          opacity: [0, 1, 1, 1],
        }}
        transition={{
          duration: 0.5,
          times: [0, 0.2, 0.7, 1],
          ease: "easeInOut",
        }}
        onUpdate={(latest) => {
          // Hide letter when scale is less than 0.8 (during shrink)
          setShowLetter(typeof latest.scale === "number" && latest.scale > 0.8);
        }}
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
        {showLetter ? letter : ""}
      </Box>
    </TableCell>
  );
}
