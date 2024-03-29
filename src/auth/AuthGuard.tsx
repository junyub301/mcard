import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState<boolean>(false)
  onAuthStateChanged(auth, (user) => {
    setInitialize(true)
  })

  if (!initialize) return <div>인증 처리중...</div>

  return <>{children}</>
}
