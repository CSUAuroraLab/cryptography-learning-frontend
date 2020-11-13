import React, { useMemo } from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { usePracticesQuery } from 'generated/graphql'
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core'

const useMenu = (language: string) => {
  return useApolloData(usePracticesQuery(), (data) => {
    let missingLang = false
    const menuItems = data.practice.labCategories.map((category, index) => {
      const categoryItems = category.labs.map((lab, index) => {
        const nameAsSameLang = lab.resources.find(resouce => resouce.lang === language)
        if(!nameAsSameLang) missingLang = true
        const name = nameAsSameLang?.name ?? (lab.resources.length ? lab.resources[0].name : "secrete lab")
        return <MenuItem id={""+index} text={name} />
      })
      const nameAsSameLang = category.name.find(category => category.lang === language)
      if(!nameAsSameLang) missingLang = true
      const name = nameAsSameLang?.text ?? (category.name.length ? category.name[0].text : "secrete labs")
      return <>
        <MenuDivider title={name}/>
        {categoryItems}
      </>
    })
    return <Menu>
      {menuItems}
    </Menu>
  })
}

export const Page: React.FC = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const menu = useMenu(language)
  return <>
    { menu }
    <div>{t('labpractices')}</div>
  </>
}