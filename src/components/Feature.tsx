import React from 'react'
import { H3, Icon, IconName } from '@blueprintjs/core'

type FeatureProps = {
  icon: IconName
  description: string
  iconSize?: number
}

export const Feature: React.FC<FeatureProps> = ({icon, description, iconSize}) => {
  return <div>
    <Icon icon={icon} iconSize={iconSize}></Icon>
    <H3>{description}</H3>
  </div>
}