import AdBanners from '@/components/home/AdBanners'
import CardList from '@/components/home/CardList'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div>
      <Top
        title="혜택 좋은 카드"
        subTitle="회원님을 위해서 혜택 좋은 카드를 모아봤어요"
      />
      <Button>안녕</Button>
      <AdBanners />
      <Button>안녕</Button>
      <Suspense
        fallback={[...new Array(10)].map((_, index) => (
          <ListRow.Skeleton key={index} />
        ))}
      >
        <CardList />
      </Suspense>
      <Button>안녕</Button>
    </div>
  )
}
