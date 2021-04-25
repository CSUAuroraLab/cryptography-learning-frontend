import React from 'react'
import logo from 'image/BigLogo.png'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { Div } from 'components/Div'
import { H1, H3, H5, Button, Intent } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { ExternalLink } from 'components/Link'
import { useHistory } from 'react-router-dom'

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`

const Container = styled(Div)`
  text-align: center;
`

const Gap = styled.div`
  height: 10px;
`

const BackContainer = styled.div`
  margin-top: -5px;
  background-color: #47555e;
  h1, h3, h5 {
    color: #EEEEEE;
    a {
      color: #48aff0;
    }
  }
  padding-bottom: 5px;
`

const NavButton = styled(Button)`
  padding: 15px 25px !important;
  min-width: 150px !important;
  font-size: 20px !important;
  border: unset !important;
  flex: 0 1 auto;
`

const TakeButton = styled(NavButton)`
  span {
    color: #61dafb;
  }
  &:hover {
    background-color: unset !important;
    span {
      color: #FFF;
    }
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
`

export const Page: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()

  return <Container>
    <Img src={logo} alt='Big Logo' />
    <BackContainer>
      <H1>{t('nav.home')}</H1>
      <H3>{t('introduction')}</H3>
      <Gap />
      <ButtonContainer>
        <NavButton large intent={Intent.PRIMARY} onClick={() => history.push('/practice')} text={t('getstarted')} />
        <TakeButton large outlined={true} rightIcon={IconNames.ARROW_RIGHT} onClick={() => history.push('/tutorial')} text={t('taketutorial')} />
      </ButtonContainer>
    </BackContainer>
    
    <BackContainer>
      <Gap />
      <H5>Copyright © 2020-2021 <ExternalLink link='https://csuwangj.github.io/'>CSUwangj</ExternalLink></H5>
      <H5>Created using <ExternalLink link='https://reactjs.org/'>React.js</ExternalLink> & <ExternalLink link='https://blueprintjs.com/'>Blueprint.js</ExternalLink></H5>
      <Gap />
    </BackContainer>
  </Container>
}