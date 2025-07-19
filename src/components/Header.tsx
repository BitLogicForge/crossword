import { useTranslation } from "react-i18next";
import { APP_AUTHOR, APP_IMAGE, APP_URL } from "../constants/CApp";

export default function Header() {
  const { t } = useTranslation();

  return (
    <>
      <title>{t("app.title")}</title>
      <meta name="description" content={t("app.description")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={t("app.keywords")} />
      <meta name="author" content={APP_AUTHOR} />
      <meta property="og:title" content={t("app.title")} />
      <meta property="og:description" content={t("app.description")} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={APP_URL} />
      <meta property="og:image" content={APP_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t("app.title")} />
      <meta name="twitter:description" content={t("app.description")} />
      <meta name="twitter:image" content={APP_IMAGE} />

      <link rel="icon" type="image/svg+xml" href="/grid-svgrepo-com.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
}
