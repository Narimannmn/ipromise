import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/shared/layouts/BaseLayout/BaseLayout";
import { privateRoutesMap } from "@/shared/navigation";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
  const { t } = useTranslation("errorPage");
  const navigate = useNavigate();

  const handleReload = () => {
    navigate(privateRoutesMap.feed);
    window.location.reload();
  };

  return (
    <BaseLayout className={styles.layout}>
      <div className={styles.container}>
        {/* <img src={unknownError} width={320} alt="Unknown error" className={styles.image} /> */}
        <h1 className={styles.title}>{t("serverError")}</h1>
        <button
          className={styles.button}
          onClick={handleReload}
        >
          {t("reload")}
        </button>
      </div>
    </BaseLayout>
  );
};
