import { getCards } from '@/remote/card'
import flatten from 'lodash.flatten'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Badge from '../shared/Badge'
import ListRow from '../shared/ListRow'

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => {
      return getCards(pageParam)
    },
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense: true,
    },
  )
  const navigate = useNavigate()

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return
    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) return null
  const cards = flatten(data.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => {
                navigate(`/card/${card.id}`)
              }}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
