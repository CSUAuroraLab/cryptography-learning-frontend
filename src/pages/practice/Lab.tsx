import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { Endpoint, useLabQuery } from 'generated/graphql'
import { Button, Card, H3, Intent } from '@blueprintjs/core'
import { useRouteMatch } from 'react-router-dom'
import { Markdown } from 'components/Markdown'
import styled from '@emotion/styled'
import { Terminal } from 'components/Terminal'
import { useState } from 'react'
import { Div } from 'components/Div'
import { contentWidth } from 'components/common'

const ScrollCard = styled(Div)`
  box-shadow: none;
  padding: 0 10px 10px 10px;
  width: ${contentWidth}px;
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
  const { i18n } = useTranslation()
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
            return <Button key={id} onClick={onClick}intent={Intent.PRIMARY} outlined={true}>{endpoint.host}</Button>
          })
        }
        <Button onClick={() => setTermianls([])} intent={Intent.DANGER} outlined={true}>clear</Button>
      </EndpointContainer>
    </>
  })
  return <ScrollCard>
    { content }
    { terminals.map((endpoint, idx) => <BlockWrapper key={idx}>
      <H3>{endpoint.host}</H3>
      <Terminal {...endpoint} id={'terminal'+idx} key={idx}/>
    </BlockWrapper>) } 
  </ScrollCard>
}