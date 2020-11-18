import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { Endpoint, useLabQuery } from 'generated/graphql'
import { Button, Card, H3 } from '@blueprintjs/core'
import { useRouteMatch } from 'react-router-dom'
import { Markdown } from 'components/Markdown'
import styled from '@emotion/styled'
import { Terminal } from 'components/Terminal'
import { useState } from 'react'

const ScrollCard = styled(Card)`
  overflow-y: auto;
  padding-top: 0;

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
  
  ::-webkit-scrollbar {
    height: 0.4rem;
    width: 0.4rem;
    background-color: rgba(0, 0, 0, 0);
  }
  
  .frac-line {
    border-bottom-width: 1px !important;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #EEE;
  }
`
export interface Match {
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
      {
        endpoints.map((endpoint, id) => {
          const onClick = () => {
            if(terminals.find(term => term === endpoint)) {
              setTermianls(terminals.filter(term => term !== endpoint))
            } else {
              setTermianls(terminals.concat([endpoint]))
            }
          }
          return <Button id={id.toString()} onClick={onClick}>{endpoint.host}</Button>
        })
      }
      <Button onClick={() => setTermianls([])}>clear</Button>
    </>
  })
  return <ScrollCard>
    { content }
    { terminals.map((endpoint, idx) => <Card >
      <H3>{endpoint.host}</H3>
      <Terminal {...endpoint} id={'terminal'+idx} key={idx}/>
    </Card>) } 
  </ScrollCard>
}