import { ApplyValues } from '@/models/apply'
import { MouseEvent, useCallback, useState } from 'react'
import Button from '../shared/Button'
import FixedBottomButton from '../shared/FixedBottomButton'
import Spacing from '../shared/Spacing'

type CardInfoValues = Pick<ApplyValues, 'isHipass' | 'isMaster' | 'isRf'>
export default function CardInfo({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: true,
    isMaster: true,
    isRf: true,
  })

  const { isHipass, isMaster, isRf } = cardInfoValues

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement
    const name = $button.name
    setCardInfoValues((pre) => ({
      ...pre,
      [name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          weak={!isMaster}
          size="medium"
          data-value={true}
          name="isMaster"
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          weak={isMaster}
          size="medium"
          data-value={false}
          name="isMaster"
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불교통기능">
        <Button
          weak={isRf}
          size="medium"
          data-value={false}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          weak={!isRf}
          size="medium"
          data-value={true}
          name="isRf"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <Spacing size={12} />
      <Button.Group title="후불하이패스카드">
        <Button
          weak={isHipass}
          size="medium"
          data-value={false}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          weak={!isHipass}
          size="medium"
          data-value={true}
          name="isHipass"
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues)
        }}
      />
    </div>
  )
}
