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
import { Unselectable } from 'components/Unselectable'

export const Page: React.FC = ({ children }) => {
  const { t } = useTranslation()

  return <>
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <Unselectable>
          <NavbarHeading>{t('site-name')}</NavbarHeading>
        </Unselectable>
        <NavbarDivider />
        <Unselectable>
          <Button className={Classes.MINIMAL} icon='home' text={t('home')} />
          <Button className={Classes.MINIMAL} icon='flag' text={t('labs')} />
          <Button className={Classes.MINIMAL} icon='search' text={t('learning')} />
        </Unselectable>
      </NavbarGroup>
    </Navbar>
    { children }
  </>
}