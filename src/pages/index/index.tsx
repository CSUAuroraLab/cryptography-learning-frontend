import React from 'react'
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

export const Page: React.FC = ({ children }) => {
  const { t } = useTranslation()

  return <>
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>{t('site-name')}</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon='home' text={t('home')} />
        <Button className={Classes.MINIMAL} icon='flag' text={t('labs')} />
        <Button className={Classes.MINIMAL} icon='search' text={t('learning')} />
      </NavbarGroup>
    </Navbar>
    { children }
  </>
}