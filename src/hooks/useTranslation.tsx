import { languageState } from "atom";
import TRANSLATIONS from "constants/language";
import { useRecoilValue } from "recoil";

const useTranslation = () => {
  const lang = useRecoilValue(languageState);

  // 플레이스홀더 치환 함수
  const replacePlaceholders = (
    text: string,
    placeholders: Record<string, string>
  ) => {
    return text.replace(
      /\{\{(\w+)\}\}/g,
      (_, key) => placeholders[key] || `{{${key}}}`
    );
  };

  return (
    key: keyof typeof TRANSLATIONS,
    placeholders: Record<string, string> = {}
  ) => {
    const translation = TRANSLATIONS[key][lang];
    return replacePlaceholders(translation, placeholders);
  };
};

export default useTranslation;
