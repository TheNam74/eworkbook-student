import { useTranslation } from 'react-i18next'

function Translation() {
  const { t, i18n } = useTranslation();
  function ChangeLanguage(lang) {
    i18n.changeLanguage(lang)
  }

  return {
    t, ChangeLanguage,
  }
}

export default Translation;
