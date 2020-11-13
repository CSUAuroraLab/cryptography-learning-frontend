import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en-US', 'zh-CN'],
    react: {
      useSuspense: false
    },
    resources: {
      'en-US': {
        translations: {
          'home': 'Home',
          'practice': 'Practice',
          'learning': 'Learning',
          'site-name': 'CryptoLearn',
          'light': 'Light',
          'dark': 'Dark',
          'welcome': 'Welcome to cryptography lab, there are resources/labs/etc for learning cryptography, hope you enjoy it!',
          'welcome-title': 'WELCOME',
          i18n: {
            'en-US': 'English',
            'zh-CN': 'Chinese(Simplified)',
          }
        }
      },
      'zh-CN': {
        translations: {
          'home': '主页',
          'practice': '实践',
          'learning': '学习',
          'site-name': '密码学学习',
          'light': '日间模式',
          'dark': '夜间模式',
          'welcome': '欢迎来到密码学实验室，这里准备了一些资源、实验、设计来帮助你学习密码学，希望你享受这里的一切！',
          'welcome-title': '欢迎',
          i18n: {
            'en-US': '英文',
            'zh-CN': '简体中文'
          }
        }
      }
    },
    fallbackLng: [ 'zh-CN', 'en-US' ],
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })


export default i18n