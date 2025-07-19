import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [open, setOpen] = useState(false);

  // Email split to prevent scraping
  const user = "bitlogicforge";
  const domain = "gmail.com";
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="contained"
        startIcon={<EmailIcon />}
        onClick={() => setOpen(true)}
        sx={{ textTransform: "none" }}
      >
        {t("labels.contact")}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {t("labels.contact")}
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            {t("labels.email")}:
            <Box
              component="span"
              sx={{
                ml: 1,
                fontWeight: "bold",
                letterSpacing: 1,
                userSelect: "all",
                fontFamily: "monospace",
                background: (theme) => theme.palette.action.hover,
                px: 1,
                borderRadius: 1,
                display: "inline-block",
              }}
            >
              {user}
              <span style={{ display: "none" }}>[at]</span>
              {"@"}
              {domain}
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {t("labels.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
