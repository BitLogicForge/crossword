import type { SelectChangeEvent } from "@mui/material";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
const LANGUAGES = [
  { code: "en", country: "GB", full: "English" },
  { code: "pl", country: "PL", full: "Polski" },
  { code: "fr", country: "FR", full: "Français" },
  { code: "de", country: "DE", full: "Deutsch" },
  { code: "es", country: "ES", full: "Español" },
  { code: "it", country: "IT", full: "Italiano" },
  { code: "ru", country: "RU", full: "Русский" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLang =
    LANGUAGES.find((l) => i18n.language.startsWith(l.code))?.code || "en";

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
  };
  const { t } = useTranslation();

  return (
    <FormControl size="small" sx={{ minWidth: 80 }}>
      <InputLabel id="lang-select-label">{t("labels.language")}</InputLabel>
      <Select
        labelId="lang-select-label"
        value={currentLang}
        label="language"
        onChange={handleChange}
        renderValue={(value) => {
          const lang = LANGUAGES.find((l) => l.code === value);
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ReactCountryFlag
                countryCode={lang?.country || "GB"}
                svg
                style={{ fontSize: 22 }}
              />
            </Box>
          );
        }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <ReactCountryFlag
              countryCode={lang.country}
              svg
              style={{ fontSize: 22, marginRight: 8 }}
            />
            {lang.full}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
