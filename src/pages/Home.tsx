import { getAdBanners } from '@/remote/adBanner'
import { getCards } from '@remote/card'
import Top from '@shared/Top'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    getCards().then((res) => {
      console.log('🚀 ~ getCards ~ res:', res)
    })
    getAdBanners().then((res) => {
      console.log('🚀 ~ getAdBanners ~ res:', res)
    })
  }, [])
  return (
    <Top
      title="혜택 좋은 카드"
      subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
    />
  )
}
