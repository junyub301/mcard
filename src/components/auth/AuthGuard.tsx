import { userAtom } from '@atoms/user'
import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const setUser = useSetRecoilState(userAtom)
  const [initialize, setInitialize] = useState<boolean>(false)
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }
    setInitialize(true)
  })

  if (!initialize) return null

  return <>{children}</>
}
