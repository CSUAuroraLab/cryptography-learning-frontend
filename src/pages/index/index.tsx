import React, { useEffect } from 'react'
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
import { Select, ItemRenderer } from "@blueprintjs/select"

const I18nSelect = Select.ofType<string>()

const I18nRender: ItemRenderer<string> = (s, { handleClick, modifiers, query }) => {
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
      text={s}
    />
  )
}

export const Page: React.FC = ({ children }) => {
  const { t, i18n } = useTranslation()
  const items = ['zh', 'en']

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
      <NavbarGroup align={Alignment.RIGHT}>
        <I18nSelect
          items={items}
          itemRenderer={I18nRender}
          onItemSelect={(i) => console.log(i)}
          noResults={<MenuItem disabled={true} text="No results." />}
        >
          <Button text={items[0]} rightIcon="double-caret-vertical" />
        </I18nSelect>
      </NavbarGroup>
    </Navbar>
    { children }
  </>
}