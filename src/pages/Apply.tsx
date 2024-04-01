import useAppliedCard from '@/components/apply/hooks/useAppliedCard'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import Apply from '@components/apply'
import useApplyCardMutations from '@components/apply/hooks/useApplyCardMutations'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { APPLY_STATUS } from '@models/apply'
import { updateApplyCard } from '@remote/apply'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const STATUS_MESSAGE = {
  [APPLY_STATUS.READY]: '카드 심사를 준비하고 있습니다.',
  [APPLY_STATUS.PROGRESS]: '카드를 심사중입니다. 잠시만 기다려주세요.',
  [APPLY_STATUS.COMPLETE]: '카드신청이 완료되었습니다.',
}

export default function ApplyPage() {
  const navigate = useNavigate()
  const user = useUser()
  const { id } = useParams() as { id: string }
  const { open } = useAlertContext()
  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied === null) return
        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
          return
        }
        setReadyToPll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const [readyToPoll, setReadyToPll] = useState<boolean>(false)
  const { data: status } = usePollApplyStatus({
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

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    return null
  }

  if (readyToPoll || isLoading) {
    return <FullPageLoader message={STATUS_MESSAGE[status ?? 'READY']} />
  }

  return <Apply onSubmit={mutate} />
}
