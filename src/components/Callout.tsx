import React, { useState } from 'react'
import classNames from 'classnames'
import { Classes, Intent, IconName, MaybeElement, Icon, H4 } from '@blueprintjs/core'
import styled from '@emotion/styled'
import { getIconName } from 'utils/getIconName'



const TransitionDiv = styled.div`
  transition: all 0.2s ease-in-out;
  div {
    transition: height 0.2s ease-in-out;
  }
`

const Button = styled.button`
  font-size: 100;
  border: 0;
  padding: 0;
  background: unset;
  cursor: pointer;
  width: 100%;
  text-align: unset;
  outline: none;
`

type CalloutProps = {
    title?: string
    intent?: Intent
    icon?: IconName | MaybeElement
}

export const Callout: React.FC<CalloutProps> = ({title, intent, icon, children}) => {
  const iconName = getIconName(icon, intent)
  const classes  = classNames(
    Classes.CALLOUT,
    Classes.intentClass(intent),
    { [Classes.CALLOUT_ICON]: iconName != null },
  )
  const [ isOpen, setOpen ] = useState(false)

  return <TransitionDiv className={classes}>
    {iconName && <Icon icon={iconName} iconSize={Icon.SIZE_LARGE} />}
    {title && <Button onClick={() => setOpen(!isOpen)}><H4>{title}</H4></Button>}
    {isOpen && children}
  </TransitionDiv>
}