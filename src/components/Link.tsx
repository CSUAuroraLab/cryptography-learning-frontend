import { generateLink, Pattern, ParamType } from 'route'

export const labLink = (params: ParamType[Pattern.Lab]) => generateLink(Pattern.Lab, params)