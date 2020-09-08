import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false
    },
    resources: {
      en: {
        translations: {
          'home': 'Home',
          'labs': 'Labs',
          'learning': 'Learning',
          'site-name': 'CryptoLearn',
        }
      },
      zh: {
        translations: {
          'home': '主页',
          'labs': '实验',
          'learning': '学习',
          'site-name': '密码学学习',
        }
      }
    },
    fallbackLng: 'zh',
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })


export default i18n