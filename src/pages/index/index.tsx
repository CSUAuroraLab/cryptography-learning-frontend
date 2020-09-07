import React from 'react'
import { useTranslation } from "react-i18next"

export const Page: React.FC = ({ children }) => {
  const { t } = useTranslation()

  return <>
    <div>{t('parent')}</div>
    { children }
  </>
}