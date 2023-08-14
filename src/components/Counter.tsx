import { FC, useState } from 'react'

type Props = {
  initialCount: number
}

type Count = {
  count: number
}

const Counter: FC<Props> = props => {
  const [state, setState] = useState<Count>({ count: props.initialCount })

  const handleClick = () => {
    setState({
      count: state.count + 1
    })
  }

  return (
    <div>
      {state.count}
      <button onClick={handleClick}>+</button>
    </div>
  )
}

export default Counter
