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
          'home': 'Cryptography Learning Platform',
          'quickstart': 'quick start',
          'introduction': 'Look, Study, Practice, all you need for cryptography is here(WIP :)',
          'practice': 'Practice',
          'learning': 'Learning',
          'light': 'Light',
          'dark': 'Dark',
          'lab-welcome': 'Welcome to cryptography lab, there are resources/labs/etc for learning cryptography, hope you enjoy it!',
          'lab-welcome-title': 'WELCOME',
          'feature': {
            'teacher': 'Guided learning',
            'flag': 'Learning cryptography through Jeopardy-style CTF',
            'translate': 'Multilingual support',
            'resource': 'Integrated resources',
            'tools': 'Cryptography toolbox prepared for novice (WIP)',
            'visualize': 'Visualize cryptographic algorithm(WIP)',
          },
          'wip': 'Work In Progress',
          i18n: {
            'en-US': 'English',
            'zh-CN': 'Chinese(Simplified)',
          }
        }
      },
      'zh-CN': {
        translations: {
          'home': '密码学学习平台',
          'quickstart': '快速开始',
          'introduction': '接触、学习、实践，为了密码学你需要的都在这（还未完成 ：）',
          'practice': '实践',
          'learning': '学习',
          'light': '日间模式',
          'dark': '夜间模式',
          'lab-welcome': '欢迎来到密码学实验室，这里准备了一些资源、实验、设计来帮助你练习密码学，希望你享受这里的一切！',
          'lab-welcome-title': '欢迎',
          'feature': {
            'teacher': '引导性的学习体验',
            'flag': '通过解题夺旗学习密码学',
            'translate': '多语言支持',
            'resource': '整合多渠道资源',
            'tools': '为新手准备的密码学工具箱（施工中）',
            'visualize': '图解密码学算法（施工中）',
          },
          'wip': '施工中',
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