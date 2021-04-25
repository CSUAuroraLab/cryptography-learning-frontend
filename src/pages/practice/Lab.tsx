import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { Endpoint, useLabQuery } from 'generated/graphql'
import { Button, Card, H3, Intent } from '@blueprintjs/core'
import { useRouteMatch } from 'react-router-dom'
import { Markdown } from 'components/Markdown'
import styled from '@emotion/styled/macro'
import { Terminal } from 'components/Terminal'
import { useState } from 'react'
import { contentWidth } from 'components/common'

const ScrollCard = styled(Card)`
  padding: 10px;
  width: ${contentWidth}px;
`

const Container = styled.div`
  padding: 20px;
  blockquote {
    margin: 2em 0;
    padding: 10px 20px;
    position: relative;
    background-color: rgba(255,255,255,0.05);
    border-left: 3px solid rgba(255,255,255,0.3);
    box-shadow: inset 0px 0px 2px 3px rgb(0 0 0 / 13%);
    border: rgba(255,255,255,0.3);
  }
  img {
    max-width: 100%;
  }
`

const BlockWrapper = styled(Card)`
  margin-top: 20px;
`
const EndpointContainer = styled(BlockWrapper)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`
interface Match {
  category: string
  lab: string
}

export const Page: React.FC = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const { params: { category, lab } } = useRouteMatch<Match>()
  const query = useLabQuery({
    variables: {
      categoryId: category,
      labId: lab,
      language: language
    }
  })
  const [ terminals, setTermianls ] = useState<Endpoint[]>([])

  const content = useApolloData(query, (data) => {
    const endpoints = data.lab.endpoints
    return <>
      <Markdown source={data.lab.content}></Markdown>
      <EndpointContainer>
        {
          endpoints.map((endpoint, id) => {
            const onClick = () => {
              if(terminals.find(term => term === endpoint)) {
                setTermianls(terminals.filter(term => term !== endpoint))
              } else {
                setTermianls(terminals.concat([endpoint]))
              }
            }
            return <Button key={id} onClick={onClick}intent={Intent.PRIMARY} outlined={true}>{t('lab.endpoint') + id.toString()}</Button>
          })
        }
        <Button onClick={() => setTermianls([])} intent={Intent.DANGER} outlined={true}>{t('lab.clear')}</Button>
      </EndpointContainer>
    </>
  })
  return <ScrollCard>
    <Container>
      { content }
      { terminals.map((endpoint, idx) => <BlockWrapper key={idx}>
        <H3>{endpoint.host}</H3>
        <Terminal {...endpoint} id={'terminal' + endpoint.host + ':' + endpoint.port } key={idx}/>
      </BlockWrapper>) } 
    </Container>
  </ScrollCard>
}