import React from 'react'
import { generateLink, Pattern, ParamType } from 'route'

export const ExternalLink: React.FC<{link: string}> = ({link, children}) => <a href={link} target='_blank' rel='noopener noreferrer'>{children}</a>

export const labLink = (params: ParamType[Pattern.Lab]) => generateLink(Pattern.Lab, params)