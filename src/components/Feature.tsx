import React from 'react'
import { H3, Icon, IconName } from '@blueprintjs/core'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'

type FeatureProps = {
  icon: IconName
  feature: string
  size: number
}

type ContainerProps = {
  width: number
}

const Container = styled.div<ContainerProps>`
  width: ${props => props.width * 2}px;
`

export const Feature: React.FC<FeatureProps> = ({icon, feature, size}) => {
  const { t } = useTranslation()
  return <div>
    <Icon icon={icon} iconSize={size}></Icon>
    <Container width={size}><H3>{t('feature.' + feature)}</H3></Container>
  </div>
}