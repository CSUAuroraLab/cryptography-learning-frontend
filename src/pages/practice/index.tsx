import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { usePracticesQuery } from 'generated/graphql'
import { Menu } from '@blueprintjs/core'
import { useHistory } from 'react-router-dom'
import { labLink } from 'components/Link'

const useMenu = (language: string) => {
  const history = useHistory()
  return useApolloData(usePracticesQuery(), (data) => {
    let missingLang = false
    const menuItems = data.practice.labCategories.map((category) => {
      const categoryItems = category.labs.map((lab, index) => {
        const nameAsSameLang = lab.resources.find(resouce => resouce.lang === language)
        if(!nameAsSameLang) missingLang = true
        const name = nameAsSameLang?.name ?? (lab.resources.length ? lab.resources[0].name : "secrete lab")
        return <Menu.Item id={""+index} onClick={() => history.push(labLink({category: category.id, lab: lab.id}))} text={name} />
      })
      const nameAsSameLang = category.name.find(category => category.lang === language)
      if(!nameAsSameLang) missingLang = true
      const name = nameAsSameLang?.text ?? (category.name.length ? category.name[0].text : "secrete labs")
      return <>
        <Menu.Divider title={name}/>
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