import React, { useState } from 'react'
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  MenuItem,
} from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { Unselectable } from 'components/Unselectable'
import { Select, IItemModifiers } from "@blueprintjs/select"
import { useHistory } from 'react-router-dom'
import { Body, Footer, Header, Layout } from 'components/Layout'
import { navbarHeight } from 'components/common'

const I18nSelect = Select.ofType<string>()

type I18nRenderProps = {
  s: string
  handleClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  modifiers: IItemModifiers
  query?: string
}

const I18nRender: React.FC<I18nRenderProps> = ({ s, handleClick, modifiers }) => {
  const { t } = useTranslation()
  if (!modifiers.matchesPredicate) {
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={s}
      key={s}
      onClick={handleClick}
      text={t('i18n.'+s)}
    />
  )
}

export const Page: React.FC = ({ children }) => {
  const { t, i18n } = useTranslation()
  // i18n.languages is list of fallback languages
  const items = i18n.languages
  // but if not using line above, seems only ugly way to do so,
  // check https://github.com/i18next/i18next/issues/1068 for discuss
  // const items = Object.keys(i18n.services.resourceStore.data)
  const [ dark, setDark ] = useState(false)
  const history = useHistory()

  return <Layout className={dark ? 'bp3-dark' : ''}>
    <Header>
      <Navbar style={{height: navbarHeight}}>
        <NavbarGroup align={Alignment.LEFT}>
          <Unselectable>
            <NavbarHeading>{t('site-name')}</NavbarHeading>
          </Unselectable>
          <NavbarDivider />
          <Unselectable>
            <Button className={Classes.MINIMAL} icon='home' text={t('home')} onClick={() => history.push('/')} />
            <Button className={Classes.MINIMAL} icon='flag' text={t('practice')} onClick={() => history.push('/practice')} />
            <Button className={Classes.MINIMAL} icon='search' text={t('learning')} onClick={() => history.push('/learning')} />
          </Unselectable>
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarDivider />
          <Button 
            text={dark ? t('light') : t('dark')} 
            icon={dark ? 'flash' : 'moon'} 
            onClick={() => {setDark(!dark)}}
          />
          <NavbarDivider />
          <I18nSelect
            items={items}
            itemRenderer={(s, {handleClick, modifiers}) => <I18nRender s={s} handleClick={handleClick} modifiers={modifiers} />}
            onItemSelect={(i) => {i18n.changeLanguage(i)}}
            noResults={<MenuItem disabled={true} text="No results." />}
          >
            <Button text={t('i18n.'+i18n.language)} rightIcon="double-caret-vertical" />
          </I18nSelect>
        </NavbarGroup>
      </Navbar>
    </Header>
    <Body>
      { children }
    </Body>
    <Footer>
    </Footer>
  </Layout>
}