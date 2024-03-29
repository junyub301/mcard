import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { FormValues } from '@models/signup'
import validator from 'validator'

export default function Form({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => void
}) {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name },
    } = e
    setDirty((prev) => ({ ...prev, [name]: 'true' }))
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
        hasError={!!dirty.email && !!errors.email}
        helpMessage={!!dirty.email ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={!!dirty.password && !!errors.password}
        helpMessage={!!dirty.password ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 확인"
        type="password"
        name="rePassword"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={!!dirty.rePassword && !!errors.rePassword}
        helpMessage={!!dirty.rePassword ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        placeholder="올라프"
        name="name"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={!!dirty.name && !!errors.name}
        helpMessage={!!dirty.name ? errors.name : ''}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        disabled={disabled}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
      />
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
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요'
  } else if (!validator.equals(formValues.password, formValues.rePassword)) {
    errors.rePassword = '비밀번호와 일치하지 않습니다.'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.'
  }

  return errors
}

const formContainerStyles = css`
  padding: 24px;
`
