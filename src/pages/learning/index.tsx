import React from 'react'
import { useTranslation } from "react-i18next"

export const Page: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('learning')}</div>
}