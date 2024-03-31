import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@/models/apply'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) {
  const user = useUser()
  const { id } = useParams() as { id: string }
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })
  const [step, setStep] = useState<number>(0)

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, step, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((pre) => ({ ...pre, terms }))
    setStep((pre) => pre + 1)
  }
  const handleBasicInfoCHange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((pre) => ({ ...pre, ...infoValues }))

    setStep((pre) => pre + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    setApplyValues((pre) => ({ ...pre, ...cardInfoValues }))
    setStep((pre) => pre + 1)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoCHange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
