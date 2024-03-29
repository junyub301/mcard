import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'

export default function Form() {
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField label="이메일" placeholder="test@gmail.com" />
      <Spacing size={16} />
      <TextField label="패스워드" type="password" />
      <Spacing size={16} />
      <TextField label="패스워드 확인" type="password" />
      <Spacing size={16} />
      <TextField label="이름" placeholder="올라프" />
      <FixedBottomButton disabled label="회원가입" onClick={() => {}} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
