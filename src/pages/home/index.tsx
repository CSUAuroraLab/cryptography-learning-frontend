import React from 'react'
import logo from 'image/BigLogo.png'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import { Div } from 'components/Div'
import { H1, H3, H5 } from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons"
import { Feature } from 'components/Feature'
import { ExternalLink } from 'components/Link'

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

const Gap = styled.div`
  height: 10px;
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
    <Gap />
    <H5>Copyright © 2020-2021 <ExternalLink link='https://csuwangj.github.io/'>CSUwangj</ExternalLink></H5>
    <H5>Created using <ExternalLink link='https://reactjs.org/'>React.js</ExternalLink> & <ExternalLink link='https://blueprintjs.com/'>Blueprint.js</ExternalLink></H5>
    <Gap />
  </Container>
}