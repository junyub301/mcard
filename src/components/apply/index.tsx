import { ApplyValues } from '@/models/apply'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'

export default function Apply({
  step,
  onSubmit,
}: {
  step: number
  onSubmit: () => void
}) {
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('🚀 ~ handleTermsChange ~ terms:', terms)
  }
  const handleBasicInfoCHange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('🚀 ~ Apply ~ infoValues:', infoValues)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>,
  ) => {
    console.log('🚀 ~ handleCardINfoCHange ~ cardInfoValues:', cardInfoValues)
  }

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoCHange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}
