import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { useCallback } from 'react'

export default function Signin() {
  const handleSubmit = useCallback((formValues: FormValues) => {
    console.log('🚀 ~ handleSubmit ~ formValues:', formValues)
  }, [])
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
