"use client"

import { NextStudio } from 'next-sanity/studio'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'

export function StudioWrapper({ config }: { config: any }) {
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <NextStudio config={config} />
    </StyleSheetManager>
  )
}
