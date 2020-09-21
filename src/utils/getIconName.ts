import { IconName, Intent, MaybeElement } from "@blueprintjs/core"

export const getIconName = (icon?: IconName | MaybeElement, intent?: Intent): IconName | MaybeElement => {
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