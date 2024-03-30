import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useState } from 'react'

export default function Apply() {
  const [step, setStep] = useState<number>(0)
  const handleTermsChange = (terms: string[]) => {
    console.log('🚀 ~ handleTermsChange ~ terms:', terms)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
