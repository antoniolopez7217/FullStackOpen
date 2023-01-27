import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.feedback}
    </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <div>
      <Button handleClick={() => setGood(good + 1)} feedback={"good"}/>
    </div>
  )
}

export default App