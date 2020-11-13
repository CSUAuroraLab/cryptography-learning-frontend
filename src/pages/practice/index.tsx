import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { usePracticesQuery } from 'generated/graphql'
import { Card, H1, Menu } from '@blueprintjs/core'
import { Route, Switch, useHistory } from 'react-router-dom'
import { labLink } from 'components/Link'
import styled from '@emotion/styled'
import { Pattern } from 'route'
import { RoutePage } from 'components/LoadPage'

const MenuWrapper = styled.div`
  height: 100%;
  width: 240px;
`

const Container = styled.div`
  display: flex;
`

const MarginedMenu = styled(Menu)`
  padding: 10px;
`

export const useMenu = (language: string) => {
  const history = useHistory()
  return useApolloData(usePracticesQuery(), (data) => {
    let missingLang = false
    const menuItems = data.practice.labCategories.map((category) => {
      const categoryItems = category.labs.map((lab, index) => {
        const nameAsSameLang = lab.resources.find(resouce => resouce.lang === language)
        if(!nameAsSameLang) missingLang = true
        const name = nameAsSameLang?.name ?? (lab.resources.length ? lab.resources[0].name : "secrete lab")
        return <Menu.Item
          id={""+index}
          onClick={() => history.push(labLink({category: category.id, lab: lab.id}))}
          text={name}
        />
      })
      const nameAsSameLang = category.name.find(category => category.lang === language)
      if(!nameAsSameLang) missingLang = true
      const name = nameAsSameLang?.text ?? (category.name.length ? category.name[0].text : "secrete labs")
      return <>
        <Menu.Divider title={name}/>
        {categoryItems}
      </>
    })
    return <MenuWrapper>
      <MarginedMenu>
        {menuItems}
      </MarginedMenu>
    </MenuWrapper>
  })
}

const Welcome: React.FC = () => {
  const { t } = useTranslation()

  return <Card>
    <H1>{t('welcome-title')}</H1>
    { t('welcome') }
  </Card>
}

export const Page: React.FC = () => {
  const { i18n } = useTranslation()

  const language = i18n.language
  const menu = useMenu(language)
  return <Container>
    { menu }
    <Switch>
      <RoutePage exact path={Pattern.Lab} page={import('./Lab')} />
      <Route path='/practice' component={Welcome} />
    </Switch>
    
  </Container>
}