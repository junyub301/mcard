import { auth } from '@remote/firebase'
import Form from '@components/signin/Form'
import { FormValues } from '@models/signin'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useAlertContext } from '@/contexts/AlertContext'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      try {
        const { email, password } = formValues
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {},
            })
          }
        }
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    },
    [open],
  )
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
