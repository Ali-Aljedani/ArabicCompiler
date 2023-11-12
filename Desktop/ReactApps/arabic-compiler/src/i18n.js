import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
    en: {
      translation: {
        app_name: "Arabic Compiler for Python",
        lessons: "Lessons",
        editor: "Editor",
        signin: "Sign In",
        homeTitle: "Programming for every one",
        homeText: "Learn programming using your native language",
        featuresTitle: "Features",
        featuresText: "To be added text",
        lessonsTitles: ["Introduction to programming", "Print commands","Variables"],
        lessonNext: "Next",
        lessonStart: "Start",
        placeHolderText: "To be added text",
        editorText: "Write commands in this text area",
        editorConsole: "The result will appear in this console",
        editorRun: "Run the code",
        ar: "Arabic",
        en: "English",
        language: "Language",
      },
    },
    ar: {
      translation: {
        app_name: "لغة البايون بالعربي",
        lessons: "الدروس",
        editor: "المحرر",
        signin: "تسجيل الدخول",
        homeTitle: "البرجمة للجميع",
        homeText: "تعلم البرجمة كاملة بلغتك الأم",
        featuresTitle: "المزايا",
        featuresText: "قيد الإنشاء",
        lessonsTitles: ["مقدمة في البرمجة", "أوامر الطباعة","المتغيرات"],
        lessonNext: "التالي",
        lessonStart: "ابدأ",
        placeHolderText: "هذا النص فيد الإنشاء",
        editorText: "اكتب الأوامر في هذه الخانة",
        editorConsole: "اضغط الزر بالاسفل لكي تظهر النتيجة",
        editorRun: "شغل البرنامج",
        username: "اسم المستخدم",
        password: "كلمة السر",
        register: "سجل",
        ar: "العربية",
        en: "الإنجيلزية",
        language: "اللغة",
        
      },
      
    },
}
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    debug: true,

    interpolation: {
      escapeValue: false,
    }
  });
export default i18n;