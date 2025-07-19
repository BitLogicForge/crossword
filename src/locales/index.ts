import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import pl from "./pl.json";
import ru from "./ru.json";

export const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
  fr: {
    translation: fr,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  it: {
    translation: it,
  },
  ru: {
    translation: ru,
  },
} as const;

export default resources;