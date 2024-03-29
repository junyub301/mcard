import { css } from '@emotion/react'
import { FormValues } from '@models/signin'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import { colors } from '@styles/colorPalette'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) {
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const disabled = Object.keys(errors).length !== 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="test@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={32} />
      <Button
        disabled={disabled}
        size="medium"
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Spacing size={12} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

function validate(formValues: FormValues) {
  let errors: Partial<FormValues> = {}
  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해 주세요.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요'
  }
  return errors
}

const formContainerStyles = css`
  padding: 24px;
`
const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
