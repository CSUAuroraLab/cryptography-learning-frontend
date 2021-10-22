import React from 'react'
import styled from '@emotion/styled/macro'
import { Div } from 'components/Div'
import { navbarHeight } from 'components/common'
import { WIP } from 'components/404'

const Wrapper = styled(Div)`
  min-height: calc(100vh - ${navbarHeight}px);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Page: React.FC = () => {

  return <Wrapper>
    <WIP />
  </Wrapper>
}