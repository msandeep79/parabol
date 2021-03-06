import React, {ReactNode} from 'react'
import styled from '@emotion/styled'
import {PALETTE} from 'styles/paletteV2'

const Header = styled('div')({
  display: 'flex',
  fontSize: 12,
  lineHeight: '12px',
  justifyContent: 'space-between',
  paddingBottom: 8,
  width: '100%'
})

const HeaderDescription = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap'
})

const HeaderName = styled('div')({
  color: PALETTE.TEXT_MAIN,
  fontWeight: 600
})

const HeaderResult = styled('div')({
  color: PALETTE.TEXT_GRAY,
  whiteSpace: 'pre-wrap'
})

interface Props {
  children: ReactNode
  title: string
  subTitle: string
}

const ThreadedItemHeaderDescription = (props: Props) => {
  const {children, title, subTitle} = props
  return (
    <Header>
      <HeaderDescription>
        <HeaderName>{title}</HeaderName>
        <HeaderResult> {subTitle}</HeaderResult>
      </HeaderDescription>
      {children}
    </Header>
  )
}

export default ThreadedItemHeaderDescription
