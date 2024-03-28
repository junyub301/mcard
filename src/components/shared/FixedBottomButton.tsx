import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import Button from './Button'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
}
export default function FixedBottomButton({
  label,
  onClick,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root_portal')

  if ($portalRoot == null) return null
  return createPortal(
    <Container>
      <Button size="medium" css={buttonStyle} full onClick={onClick}>
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`
const buttonStyle = css`
  border-radius: 8px;
`