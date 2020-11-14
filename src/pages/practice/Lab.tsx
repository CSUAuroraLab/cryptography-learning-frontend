import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { useLabQuery } from 'generated/graphql'
import { Card } from '@blueprintjs/core'
import { useRouteMatch } from 'react-router-dom'
import { Markdown } from 'components/Markdown'
import styled from '@emotion/styled'

const ScrollCard = styled(Card)`
  overflow-y: auto;
  height: calc(100vh - 60px);

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

  return useApolloData(query, (data) => {
    return <ScrollCard>
      <Markdown source={data.lab.content}></Markdown>
    </ScrollCard>
  })
}