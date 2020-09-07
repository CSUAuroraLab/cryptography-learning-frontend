import React from 'react'
import { Icon, Intent } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

export const Loading: React.FC = () => {
  return <Icon icon={IconNames.REPEAT} iconSize={Icon.SIZE_LARGE} intent={Intent.PRIMARY} />
}
