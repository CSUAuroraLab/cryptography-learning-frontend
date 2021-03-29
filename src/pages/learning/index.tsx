import React, {useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { WIP } from 'components/404'
import { Div } from 'components/Div'
import styled from '@emotion/styled/macro'
import { navbarHeight } from 'components/common'

const Wrapper = styled(Div)`
  min-height: calc(100vh - ${navbarHeight}px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Page: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    const currentTitle = document.title
    document.title = t('learning')
    return () => {document.title = currentTitle}
  },[t] )

  return <Wrapper>
    <WIP />
  </Wrapper>
}