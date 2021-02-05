import { memo } from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 30px;

  & > * {
    margin: 10px;
    text-align: center;
  }
`

const SmallText = styled.div`
  font-size: 20px;
`

interface Props {
  score: number,
}

const GameOver = ({
  score,
}: Props) => (
  <Root>
    <div>GAME OVER</div>
    <div>Your score: {score}</div>
    <SmallText>To restart the game, press Esc or click &apos;Restart&apos;</SmallText>
  </Root>
)

export default memo(GameOver)
