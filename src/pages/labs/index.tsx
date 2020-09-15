import React from 'react'
import { useTranslation } from 'react-i18next'
import { Terminal } from 'components/Terminal'

export const Page: React.FC = () => {
  const { t } = useTranslation()
  
  return <>
    <div>{t('labs')}</div>
    <Terminal host='192.168.16.128' port={10020} />
  </>
}