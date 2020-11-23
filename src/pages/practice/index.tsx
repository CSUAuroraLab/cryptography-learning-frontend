import React, { useEffect } from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { usePracticesQuery } from 'generated/graphql'
import { Card, Divider, H1, Menu } from '@blueprintjs/core'
import { Route, Switch, useHistory } from 'react-router-dom'
import { labLink } from 'components/Link'
import styled from '@emotion/styled'
import { Pattern } from 'route'
import { RoutePage } from 'components/LoadPage'
import { Div } from 'components/Div'
import { menuWidth, navbarHeight } from 'components/common'

const Container = styled.div`
  display: flex;
`

const WelcomeContainer = styled(Card)`
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: space-around;
`

const ContentWrapper = styled(Div)`
  flex: 1 1 auto;
  display: flex;
  padding: 0;
  justify-content: space-around;
  overflow-y: auto;
  height: calc(100vh - ${navbarHeight}px);
`

const MarginedMenu = styled(Div)`
  height: calc(100vh - ${navbarHeight}px);
  ul {
    height: 100%;
    border-radius: 0;
  }
`

export const useMenu = (language: string) => {
  const history = useHistory()
  return useApolloData(usePracticesQuery(), (data) => {
    const menuItems = data.practice.labCategories.map((category, categoryIndex) => {
      const categoryItems = category.labs.map((lab, labIndex) => {
        const nameAsSameLang = lab.resources.find(resouce => resouce.lang === language)
        const name = nameAsSameLang?.name ?? (lab.resources.length ? lab.resources[0].name : "secrete lab")
        return <Menu.Item
          key={categoryIndex+'.'+labIndex}
          onClick={() => history.push(labLink({category: category.id, lab: lab.id}))}
          text={name}
        />
      })
      const nameAsSameLang = category.name.find(category => category.lang === language)
      const name = nameAsSameLang?.text ?? (category.name.length ? category.name[0].text : "secrete labs")
      return <>
        <Menu.Divider title={name} key={categoryIndex.toString()}/>
        {categoryItems}
      </>
    })
    return <>
      <MarginedMenu style={{width: menuWidth}}>
        <Menu>
          {menuItems}
        </Menu>
      </MarginedMenu>
    </>
  })
}

const Welcome: React.FC = () => {
  const { t } = useTranslation()

  return <WelcomeContainer>
      <div>
      <H1>{t('welcome-title')}</H1>
        <p>{ t('welcome') }</p>
      </div>
    </WelcomeContainer>
}

export const Page: React.FC = () => {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    const currentTitle = document.title
    document.title = t('practice')
    return () => {document.title = currentTitle}
  },[t] )

  const language = i18n.language
  const  menu = useMenu(language)
  return <Container>
    { menu }
    <Divider />
    <ContentWrapper>
      <Switch>
        <RoutePage exact path={Pattern.Lab} page={import('./Lab')} />
        <Route path='/practice' component={Welcome} />
      </Switch>
    </ContentWrapper>
  </Container>
}