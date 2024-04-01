import { useQuery } from 'react-query'
import Skelton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import { useInView } from 'react-intersection-observer'

export default function Review() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  })
  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((resolve) => {
        setTimeout(() => {
          resolve(['너무 좋아요', '꼭 신청하세요!'])
        }, 2000)
      })
    },
    {
      enabled: inView,
    },
  )
  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skelton width={30} height={10} />
          <Spacing size={3} />
          <Skelton width={30} height={10} />
        </>
      ) : (
        data.map((review, index) => <div key={index}>{review}</div>)
      )}
    </div>
  )
}
