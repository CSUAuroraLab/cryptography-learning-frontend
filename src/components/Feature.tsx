import React from 'react'
import { H3, Icon, IconName } from '@blueprintjs/core'
import styled from '@emotion/styled/macro'

type FeatureProps = {
  icon: IconName
  description: string
  size: number
}

type ContainerProps = {
  width: number
}

const Container = styled.div<ContainerProps>`
  width: ${props => props.width * 2}px;
`

export const Feature: React.FC<FeatureProps> = ({icon, description, size}) => {
  return <div>
    <Icon icon={icon} iconSize={size}></Icon>
    <Container width={size}><H3>{description}</H3></Container>
  </div>
}