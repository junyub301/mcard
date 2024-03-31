import useUser from '@/hooks/auth/useUser'
import Apply from '@components/apply'
import useApplyCardMutations from '@components/apply/hooks/useApplyCardMutations'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { APPLY_STATUS } from '@models/apply'
import { updateApplyCard } from '@remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ApplyPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [readyToPoll, setReadyToPll] = useState<boolean>(false)
  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })
  const { mutate, isLoading } = useApplyCardMutations({
    onSuccess: () => {
      setReadyToPll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  if (readyToPoll || isLoading) {
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}
