import React from 'react'
import { useApolloData } from 'hooks/common'
import { useTranslation } from 'react-i18next'
import { useLabQuery } from 'generated/graphql'
import { Card } from '@blueprintjs/core'
import { useRouteMatch } from 'react-router-dom'
import { Markdown } from 'components/Markdown'

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
    return <Card>
      <Markdown source={data.lab.content}></Markdown>
    </Card>
  })
}