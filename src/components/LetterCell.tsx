import { Box, TableCell } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { SYMBOL } from "../constants/Cgeneral";
import { useAppSelector } from "../stores/hooks";

type TProps = {
  letter: string;
};

export default function LetterCell({ letter }: TProps) {
  const [showLetter, setShowLetter] = useState(false);
  const themeOptions = useAppSelector((state) => state.app.themeOptions);
  const delay = Math.random() * 0.4;
  const duration = 0.6 + Math.random() * 0.1;
  const bgDuration = 1.2 + Math.random() * 0.2;
  return (
    <TableCell sx={{ p: 0, m: 0, border: 0 }}>
      <Box
        component={motion.div}
        key={letter}
        initial={{
          scale: 1,
          opacity: 0,
          backgroundColor:
            letter === SYMBOL.EMPTY
              ? themeOptions?.palette.primary.main
              : themeOptions?.palette.secondary.main,
        }}
        animate={{
          scale: [1, 0.5, 1],
          opacity: [0, 0.7, 1],
          backgroundColor:
            letter === SYMBOL.EMPTY
              ? themeOptions?.palette.secondary.main
              : themeOptions?.palette.primary.main,
        }}
        transition={{
          delay: delay,
          duration: duration,
          times: [0, 0.7, 1],
          ease: "easeInOut",
          backgroundColor: { duration: bgDuration, delay: delay },
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
          // backgroundColor:
          //   letter === SYMBOL.EMPTY ? "secondary.main" : "primary.main",
          color: letter === SYMBOL.EMPTY ? "secondary.text" : "primary.text",
          margin: "2px",
        }}
      >
        {showLetter ? letter : ""}
      </Box>
    </TableCell>
  );
}
