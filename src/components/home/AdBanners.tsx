import { css } from '@emotion/react'
import { useQuery } from 'react-query'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { getAdBanners } from '@remote/adBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function AdBanners() {
  const { data } = useQuery(['adBanners'], () => getAdBanners())
  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>배너 타이틀</Text>
                  <Text typography="t7">배너내용</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`

const Container = styled.div`
  padding: 24px;
`
