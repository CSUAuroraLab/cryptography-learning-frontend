import React from 'react'
import logo from 'image/BigLogo.png'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { Div } from 'components/Div'
import { H1, H3 } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { Feature } from 'components/Feature'

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`

const Container = styled(Div)`
  text-align: center;
`

const FeatureContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
`

export const Page: React.FC = () => {
  const { t } = useTranslation()

  return <Container>
    <Img src={logo} alt='Big Logo' />
    <H1>{t('home')}</H1>
    <H3>{t('introduction')}</H3>
    <FeatureContainer>
      <Feature icon={IconNames.LEARNING} description={t('feature-teacher')} size={150}/>
      <Feature icon={IconNames.FLAG} description={t('feature-flag')} size={150}/>
      <Feature icon={IconNames.TRANSLATE} description={t('feature-translate')} size={150}/>
    </FeatureContainer>
    <FeatureContainer>
      <Feature icon={IconNames.BOOK} description={t('feature-resource')} size={150}/>
      <Feature icon={IconNames.BRIEFCASE} description={t('feature-tools')} size={150}/>
      <Feature icon={IconNames.GRAPH} description={t('feature-visualize')} size={150}/>
    </FeatureContainer>
  </Container>
}