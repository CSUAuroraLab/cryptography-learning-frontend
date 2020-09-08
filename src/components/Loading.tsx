import React from 'react'
import { Intent, Spinner } from '@blueprintjs/core'

export const Loading: React.FC = () => {
  return <Spinner intent={Intent.PRIMARY} size={50} />
}
