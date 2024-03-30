import { ApplyValues } from '@/models/apply'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useState } from 'react'

export default function Apply() {
  const [step, setStep] = useState<number>(1)
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    // console.log('🚀 ~ handleTermsChange ~ terms:', terms)
  }
  const handleBasicInfoCHange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('🚀 ~ Apply ~ infoValues:', infoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoCHange} />}
      {step === 2 && <CardInfo />}
    </div>
  )
}
