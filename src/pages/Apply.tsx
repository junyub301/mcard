import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useState } from 'react'

export default function Apply() {
  const [step, setStep] = useState<number>(0)

  return (
    <div>
      {step === 0 && <Terms />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
