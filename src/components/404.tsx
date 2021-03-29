import React from 'react'
import { H1, Icon } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

export const WIP: React.FC = () => {
  const { t } = useTranslation()
  return <div>
    <Icon icon='outdated' iconSize={200} />
    <H1>{t('wip')}</H1>
  </div>
}