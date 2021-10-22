import React, { useState } from 'react'
import {
  Alignment,
  Button,
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
import styled from '@emotion/styled/macro'
import { IconNames } from '@blueprintjs/icons'

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

const NavMenu = styled(Navbar)`
  height: ${navbarHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #EEE;
  font-size: 20px;
`

export const Page: React.FC = ({ children }) => {
  const { t, i18n } = useTranslation()
  // i18n.languages is list of fallback languages
  const items = i18n.languages
  // but if not using line above, seems only ugly way to do so,
  // check https://github.com/i18next/i18next/issues/1068 for discuss
  // const items = Object.keys(i18n.services.resourceStore.data)
  const [ dark, setDark ] = useState(false)
  const history = useHistory()
  const feedbackURL = process.env.REACT_APP_FEEDBACK_URL
  const handleOpenFeedback = feedbackURL ? () => window.open(feedbackURL) : () => history.push('/feedback')

  return <Layout className={dark ? 'bp3-dark' : ''}>
    <Header>
      <NavMenu className='bp3-dark'>
        <NavbarGroup align={Alignment.LEFT}>
          <Unselectable>
            <NavbarHeading><Button minimal large icon={IconNames.HOME} text={t('nav.home')} onClick={() => history.push('/')}/></NavbarHeading>
          </Unselectable>
          <NavbarDivider />
          <Unselectable>
            {/* <Button minimal large icon={IconNames.HELP} text={t('nav.tutorial')} onClick={() => history.push('/tutorial')} /> */}
            {/* <Button minimal large icon={IconNames.SEARCH} text={t('nav.learning')} onClick={() => history.push('/learning')} /> */}
            <Button minimal large icon={IconNames.FLAG} text={t('nav.practice')} onClick={() => history.push('/practice')} />
            <Button minimal large icon={IconNames.ENVELOPE} text={t('nav.feedback')} onClick={handleOpenFeedback} />
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
      </NavMenu>
    </Header>
    <Body>
      { children }
    </Body>
    <Footer>
    </Footer>
  </Layout>
}