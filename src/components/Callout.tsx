import React from 'react'
import classNames from 'classnames'
import { Classes, Intent, IconName, MaybeElement, Icon, H4 } from '@blueprintjs/core'

type CalloutProps = {
    title?: string
    intent?: Intent
    icon?: IconName | MaybeElement
}


const getIconName = (icon?: IconName | MaybeElement, intent?: Intent): IconName | MaybeElement => {
  // 1. no icon
  if (icon === null) {
    return undefined
  }
  // 2. defined iconName prop
  if (icon !== undefined) {
    return icon
  }
  // 3. default intent icon
  switch (intent) {
  case Intent.DANGER:
    return "error"
  case Intent.PRIMARY:
    return "info-sign"
  case Intent.WARNING:
    return "warning-sign"
  case Intent.SUCCESS:
    return "tick"
  default:
    return undefined
  }
}

export const Callout: React.FC<CalloutProps> = ({title, intent, icon, children}) => {
  const iconName = getIconName(icon, intent)
  const classes  = classNames(
    Classes.CALLOUT,
    Classes.intentClass(intent),
    { [Classes.CALLOUT_ICON]: iconName != null },
  )

  return <div className={classes}>
    {iconName && <Icon icon={iconName} iconSize={Icon.SIZE_LARGE} />}
    {title && <H4>{title}</H4>}
    {children}
  </div>
}