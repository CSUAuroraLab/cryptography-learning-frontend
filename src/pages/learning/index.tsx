import React, {useEffect} from 'react'
import { useTranslation } from 'react-i18next'

export const Page: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    const currentTitle = document.title
    document.title = t('learning')
    return () => {document.title = currentTitle}
  },[t] )

  return <></>
}